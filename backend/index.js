import express from 'express'
import cors from 'cors';
import path from 'path';
import mongoose, { mongo } from 'mongoose';
import bodyParser from 'body-parser';

const app = express();


// ----------------------------\\
//  data base Connection ....
// -----------------------------\\ 

const dbconnect = async()=>{
  const dbase =  await mongoose.connect("mongodb://127.0.0.1:27017/stackOverFlow");
console.log("Connected with database...");


}
dbconnect();

// ==========================  SCHEMA SECTION  ================================//


const questionSchema = new mongoose.Schema({
    tittle:String,
    body:String,
    tags:[],
    created_at:{
        type:Date,
        default:Date.now(),},
        user:Object,
        comment_id:{
            type:mongoose.Schema.Types.ObjectId, 
            ref:"Comment",
        },
    

});

const commentSchema = new mongoose.Schema({
    question_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Questions",

    },
    comment:String,
    created_at:{
        type:Date,
        default:Date.now(),
    },
    user:Object,

});



const answerSchema = new mongoose.Schema({
    question_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Questions",
    },
    answer:String,
    created_at:{
        type:Date,
        default:Date.now(),
    },
    user:Object,
    comment_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comments",
    },
})

const answer_model =   mongoose.model("answers",answerSchema);
const comment_modle = mongoose.model("comments",commentSchema);
const question_model =   mongoose.model("Questions",questionSchema);



// ====================================================================


// ----------------------------\\
// Middleware.....
// -----------------------------\\

app.use(bodyParser.json({linit:"50mb"}))
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}))

app.use(express.json())


// headers.......................

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin',"*")
    res.header('Access-Control-Allow-Headers',"*")
    next();
})

// 
// 
// API.........
// 
// 

app.post('/post-answer',async(req,res)=>{
    const ansData = new answer_model({
        question_id:req.body.question_id,
        answer:req.body.answer,
        user:req.body.user
    })

    await ansData.save().then((doc)=>{
        res.status(201).send({
            status:true,
            data:doc
        })
    }).catch((err)=>{
        res.status(400).send({
            status:true,
            message:"ERROR WHILE ADDING ANSWER !!!"
        })
    })
})

app.post('add-comment/:id',async(req,res)=>{
   const commentData = new comment_modle({
    question_id:req.body.id,
    comment:req.body.comment,
    user:req.body.user
   });

   await commentData.save().then((doc)=>{
    res.status(200).send({
        data:doc,
        status:true
    })
   }).catch((err)=>{
    res.status(400).status({
        status:false,
        message:" ! ERROR "
    })
   })
})

app.post('/api/question', async( req,res)=>{
    const questionData =new question_model({
        tittle:req.body.tittle,
        body:req.body.body,
        tags:req.body.tags,
        user:req.body.user
    });

    await questionData.save().then((doc)=>{
        res.status(201).send({
            status:true,
             data:doc
        })
    }).catch((err)=>{
        res.status(400).send({
            status:false,
            message:"Oops! Error Found...",
        })
    })
})

 


app.post("/comment",async(req,res)=>{
    const commentData = new comment_modle({
        question_id:req.body.question_id,
        answer:req.body.answer,
        user:req.body.user
    });

    await commentData.save().then((doc)=>{
        res.status(201).send({
            status:true,
            data:doc
        })

    }).catch((err)=>{
        res.status(400).send({
            status:false,
            message:"Oops! Error Found..."
        })
    })
})



app.post('/post-answer',async (req ,res)=>{
    const answerData = new answer_model({

        question_id:req.body.question_id,
        answer:req.body.answer,
        user:req.body.user
 

    })

    await answerData.save().then((doc)=>{
        res.status(200).send({
            status:true,
            data:doc
        })
    }).catch((err)=>{
        res.status(400).send({
            status:false,
            message:"Oops! Error Found"
        })
    })
})


app.get('/all-questionss',async(req,res)=>{
   await question_model.find().then((ress)=>{
        res.status(200).json(ress)
    }).catch((err)=>{
        console.log(err)
    })
})


// post  =============================
app.get('/check', async(req,res)=>{

    // dbconnect();

    question_model.find().then((result)=>{
        res.status(200).json(result)
    }).catch((err)=>{
    console.log(err)
    })


})



// app.get('/answer',async(req,res)=>{
//     question_model.aggregate([
//     {$lookup:{
//         from:"answers",
//         let:{question_id:"$_id"},
//         pipeline:[
//             {
//                 $match:{
//                     $expr:{
//                         $eq:["$question_id","$$question_id"],
//                     },
//                 },
//             },
//             {
//                 $project:{
//                     _id:1,
//                 },
//             },
//         ],
//         as:"answerDetails"
//     },
// },
// {
//     $project:{
//         __v:0,
//     },
// },
// ])
// })




app.get('/all/questions',async(req,res)=>{
    question_model.aggregate([{
        $lookup:{
            from:"comments",
            let:{
                question_id:"$_id"
            },
            pipeline:[
                {
                    $match:{
                        $expr:{
                            $eq:["$question_id","$$question_id"],
                        },
                    },
                },
                {
                    $project:{
                        _id:1,
                        // user_id:1,
                        comment:1,
                        created_at:1 ,
                        // question_id:1,
                    },
                },

            ],
            as: "comments",
        },
    },
    {
        $lookup:{
            from:"answers",
            let:{question_id:"$_id"},
            pipeline:[
                {
                    $match:{
                        $expr:{
                            $eq:["$question_id","$$question_id"],
                        },
                    },
                },  {
                    $project:{
                        _id:1,
                    },
                },
            ],
            as:"answerDetails",
        },
    },
    {
        $project :{
            __v:0,
        },
    },
]).exec().then((questionDetails)=>{
    res.status(200).send(questionDetails);
}).catch((err)=>{
    console.log("error",err);
    res.status(400).send(err);
});

});

app.get('/:id',async(req,res)=>{

    try{
        question_model.aggregate([
            {
                $match:{_id:mongoose.Types.ObjectId(req.params.id)},
            },{
            $lookup:{
                from:"comments",
                let:{
                    question_id:"$_id"
                },
                pipeline:[
                    {
                        $match:{
                            $expr:{
                                $eq:["$question_id","$$question_id"],
                            },
                        },
                    },
                    {
                        $project:{
                            _id:1,
                            user:1,

                            // user_id:1,
                            comment:1,
                            created_at:1 ,
                            question_id:1,
                        },
                    },
    
                ],
                as: "comments",
            },
        },
        {
            $lookup:{
                from:"answers",
                let:{question_id:"$_id"},
                pipeline:[
                    {
                        $match:{
                            $expr:{
                                $eq:["$question_id","$$question_id"],
                            },
                        },
                    },  {
                        $project:{
                            _id:1,
                            answer:1,
                            user:1,
                            question_id:1,
                            created_at:1,
                        },
                    },
                ],
                as:"answerDetails",
            },
        },
        {
            $project :{
                __v:0,
            },
        },
    ]).exec().then((questionDetails)=>{
        res.status(200).send(questionDetails);
    }).catch((err)=>{
        console.log("error",err);
        res.status(400).send(err);
    });
    }
    catch{
        res.status(400).send({
            status:false,
            message:"Opp's ERROR...!"
        })
    }




})

// StaticResources..........
const PORT = process.env.PORT || 3222;
app.use(cors())

// server________________________-----_________----__________-----__________--------___________________-----------___________--------------_____-
app.listen(3001, ()=>{
    console.log(`listening on port ${3000}`)
})