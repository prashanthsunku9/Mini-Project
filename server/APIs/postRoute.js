const exp=require('express')
const pApp=exp.Router();
const cloudinary=require('cloudinary');
const expressAsyncHandler=require('express-async-handler');

pApp.use(exp.json());


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_KEY, 
    api_secret:process.env.CLOUDINARY_SEC
});

pApp.get('/getal',expressAsyncHandler(async(req,res)=>{

    const pColl=req.app.get('pColl');

    const posts=await pColl.find({}).toArray();

    res.send({success:true,data:posts});



}))

pApp.post('/posti',expressAsyncHandler(async(request,response)=>{

 
       const  {photo,name,prompt}=request.body; 

          const photoUrl = await cloudinary.uploader.upload(photo);

          const pColl=request.app.get('pColl');
          const obj={
            photo:photoUrl.url,name:name,prompt:prompt
          }

    const newPost=await  pColl.insertOne(obj);


      res.send({success:true,data:newPost});

}))



module.exports=pApp;