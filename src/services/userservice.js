const Recieptnist = require('../models/reseptionmodule')
const Doctor = require('../models/doctormodule');
const Nurse = require('../models/nursemodule')
const Patent = require('../models/patentmodule');
const Admin = require('../models/adminLogin');
const Token = require('../models/id_token');

////////////////////////add/////////////////////
const addRecieptnist = async (body) => {
    const resdata = await Recieptnist.create(body)
    return resdata;
}
const addDoctor = async (body) => {
    const docdata = await Doctor.create(body)
    return docdata;
}
const addNurse = async (body) => {
    const nurdata = await Nurse.create(body)
    return nurdata;
}
const addPatent = async (body) => {
    const patdata = await Patent.create(body)
    return patdata;
}
const addAdmin = async (body) => {
    const admin = await Admin.create(body)
    return admin;
}
const addtoken = async (body) => {
    const adToken = await Token.create(body)
    return adToken;
}
const addAdminhash = async (body, hash) => {
    const bdy = new Admin({
        userName: body.userName,
        password: hash
    })
    const admin = await Admin.create(bdy)
    return admin;
}
////////////////////////get////////////////////////
const getdocnur = async (id) => {
    const alldata = await Doctor.aggregate(
        [
            // {
            //     $lookup:{ 
            //         from:"doctors",
            //         as:"Doctor"
            //     }
            // },
            {
                $match: { _id: id },
            },
            {
                $lookup: {
                    from: "nurses",
                    localField: "_id",
                    foreignField: "Doctor_id",
                    as: 'Nurse'
                }
            }]
    )
    return alldata;
}
////////////$addFileds///////////////
const updatefileds = async (id, body) => {
    const pipeline = [{
        $match: { _id: id }
    }, {
        $addFields: {
            recieptnist_id: "4d550a66-0bec-4219-8982-98fa2ce4485a"
        }
    }, {
        $merge: {
            into: "doctors"
        }
    }];
    let getdate = await Doctor.aggregate(pipeline);
    let updatefi = await Doctor.findByIdAndUpdate({ _id: id }, body);
    return updatefi;
}
const groupby = async () => {
    const pipeline = [{
        $group: {
            _id: "$Timing",
            count: { $sum: 1 },
            firstvalue: { $first: "$phoneno" },
            lastValue: { $last: "$phoneno" },
            name: { $push: "$name" },
            array: { $addToSet: "$possion" },
        }
    }];
    let group = await Doctor.aggregate(pipeline);
    return group;
}
const project = async (id) => {
    const pipeline = [
        {
            $match: { _id: id }
        },
        {
            $project: {
                name: "$name",
                phoneno: "$phoneno",
                address: "$address",
            }
        }
    ];
    let pro = await Nurse.aggregate(pipeline);
    return pro;
};

const sort = async () => {
    // const pipeline=[{
    //     $sort:{
    //         _id:-1,
    //         name:1  }
    // }]
    // let sor=await Patent.aggregate(pipeline);
    // return sor;
    const pipeline = [{
        $sortByCount: "$name"
    }]
    let sor = await Patent.aggregate(pipeline);
    return sor;
}
const pip = async () => {
    const pipe = await Doctor.aggregate([{
        $facet: {
            "hospital": [{
                $lookup: {
                    from: "nurses",
                    let: { docterid: "$_id" },
                    pipeline:
                        [{
                            $match: {
                                $expr: {
                                    $eq: ['$Doctor_id', '$$docterid'],
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: "patents",
                                let: { nurse: "$_id" },
                                pipeline:
                                    [{
                                        $match: {
                                            $expr: {
                                                $and: ['$Nurse_id', '$$nurse'],
                                            }
                                        }
                                    }],
                                as: 'patient'
                            }
                        }
                        ],
                    as: 'Nurse'
                }
            }]
        }

    }])
    return pipe;
}
const ReceptionistAllData = async () => {
    const getAllValue = await Recieptnist.aggregate([

        {
            $facet: {
                "Reciptnist": [{
                    $lookup: {
                        from: "doctors",
                        let: { reciptionid: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$recieptnist_id", "$$reciptionid"],
                                    },
                                },
                            },
                            {
                                $lookup: {
                                    from: "nurses",
                                    let: { doctorid: "$_id" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$Doctor_id", "$$doctorid"],
                                                },
                                            },
                                        },
                                        {
                                            $lookup: {
                                                from: "patents",
                                                let: { nurseid: "$_id" },
                                                as: "Patient",
                                                pipeline: [
                                                    {
                                                        $match: {
                                                            $expr: {
                                                                $eq: ["$Nurse_id", "$$nurseid"],
                                                            },
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                    ],
                                    as: "Nurse",
                                },
                            },
                        ],
                        as: "Doctor",
                    },

                }]
            }

        },
    ]);
    return getAllValue;
};
const condition = async () => {
    const value = await Doctor.aggregate([{
        $project: {
            name: 1,
            possion: 1,
            specialist: {
                $cond: {
                    if: { $eq: ["$possion", "Senier"] }, then: "original doctor", else: "Dupe Doctor"
                }
            }
        }
    }])
    return value;
}

//////////////////////////////////////////
const getrec = async (id) => {
    const values = await Recieptnist.aggregate(
        [{ $match: { _id: id } }]
    );
    return values;
}
const getdoc = async (id) => {
    const values = await Doctor.aggregate(
        [{ $match: { _id: id } }]
    );
    return values;
}
// const getdocter=async()=>
// {
//     const values=await Doctor.aggregate([
//         [{
//             $match:{active:true}
//         }]
//     ]);
//     return values;
// }
const getdocter = async () => {
    const data = await Doctor.aggregate([
        {
            $match: { active: true }
        }
    ]);
    return data;
}
const getadmin = async () => {
    const data = await Admin.aggregate([
        {
            $match: { active: true }
        }
    ]);
    return data;
}
const getallnurse = async (id) => {
    const values = await Nurse.aggregate(
        [{ $match: { active: true } }]
    );
    return values;
}
const getallReceptionist = async () => {
    const data = await Recieptnist.aggregate([
        { $match: { active: true } }]);
    return data;
}
const getnur = async (id) => {
    const values = await Nurse.aggregate(
        [{ $match: { _id: id } }]
    );
    return values;
}
const getpat = async (id) => {
    const values = await Patent.aggregate(
        [{ $match: { _id: id } }]
    );
    return values;
}

const getallpatient = async () => {
    const values = await Patent.aggregate(
        [{ $match: { __v: 0 } }]
    );
    return values;
}
///////////////////////////Sign In Admin/////////////////////////////

const adminSignin = async (body) => {
    const existingUser = await Admin.findOne({ userName: body })
    return existingUser;
}
const tokenData=async (body)=>{
    const data=await Token.create(body)
    return data;
}
////////////////////////////////END//////////////////////////////////

/////////get token id//////////
const getTokenId=async (aToken)=>{
    const data=await Token.findOne({admin_Token:aToken})   
    return data;
}
/////////////////////////////
//////////////////////////////delete token//////////////////////////
const deleteToken=async(id)=>{
    let data=await Token.aggregate(
        [{ $match: { admin_Id: id } }]
    );
    if(!data){
        console.log("no Id found");
    }else{
        data=await Token.findOneAndDelete({admin_Id:id})
    }
    // return data;
}
//////////////////////update//////////////////

const Updaterec = async (id, body) => {
    let user = await Recieptnist.findById(id);
    if (!user) {
        console.log("id not found")
    }
    user = await Recieptnist.findByIdAndUpdate({ _id: id }, body);
    return user;
}
const Updatenur = async (id, body) => {
    let user = await Nurse.findById(id);
    if (!user) {
        console.log("id not found")
    }
    user = await Nurse.findByIdAndUpdate({ _id: id }, body);
    return user;
}
const Updatedoc = async (id, body) => {
    let user = await Doctor.findById(id);
    if (!user) {
        console.log("id not found")
    }
    user = await Doctor.findByIdAndUpdate({ _id: id }, body);
    return user;
}
const Updatepat = async (id, body) => {
    let user = await Patent.findById(id);
    if (!user) {
        console.log("id not found")
    }
    user = await Patent.findByIdAndUpdate({ _id: id }, body);
    return user;
}
//////////////////////////delete//////////////

const deleterec = async (id, body) => {
    let user = await Recieptnist.findById(id);
    if (!user) {
        console.log("id not found")
    }
    user = await Recieptnist.findByIdAndDelete({ _id: id, body });
    return user;
}
const deletedoc = async (id, body) => {
    let user = await Doctor.findById(id);
    if (!user) {
        console.log("id not found")
    }
    user = await Doctor.findByIdAndDelete({ _id: id, body });
    return user;
}
const deletenur = async (id, body) => {
    let user = await Nurse.findById(id);
    if (!user) {
        console.log("id not found")
    }
    user = await Nurse.findByIdAndDelete({ _id: id, body });
    return user;
}
const deletepat = async (id, body) => {
    let user = await Patent.findById(id);
    if (!user) {
        console.log("id not found")
    }
    user = await Patent.findByIdAndDelete({ _id: id, body });
    return user;
}
////////////////////////////////////////
module.exports = {
    addRecieptnist,
    addDoctor,
    addNurse,
    addPatent,
    addAdmin,
    addAdminhash,
    getadmin,
    getrec,
    getdoc,
    getnur,
    getpat,
    getallReceptionist,
    Updatedoc,
    Updatenur,
    Updatepat,
    Updaterec,
    deleterec,
    deletedoc,
    deletenur,
    deletepat,
    getdocter,
    addtoken,
    adminSignin,
    tokenData,
    getTokenId,
    deleteToken,

    getdocnur,
    getallnurse,
    getallpatient,
    updatefileds,
    groupby,
    project,
    sort,
    pip,
    condition,
    ReceptionistAllData
}
