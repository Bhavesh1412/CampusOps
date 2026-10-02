import mongoose from 'mongoose';
const opts = { timestamps: true };
const userSchema = new mongoose.Schema({ name:{type:String,required:true,trim:true}, email:{type:String,required:true,unique:true,lowercase:true,trim:true}, password:{type:String,required:true, minlength:6}, role:{type:String,enum:['student','recruiter','admin'],default:'student'}, college:{type:String,default:''}, disabled:{type:Boolean,default:false} }, opts);
const jobSchema = new mongoose.Schema({ title:{type:String,required:true}, company:{type:String,required:true}, description:{type:String,required:true}, location:{type:String,required:true}, salary:{type:Number,required:true,min:0}, skills:[String], eligibility:{type:String,required:true}, deadline:{type:Date,required:true}, createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true} }, opts);
const applicationSchema = new mongoose.Schema({ student:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, job:{type:mongoose.Schema.Types.ObjectId,ref:'Job',required:true}, status:{type:String,enum:['Applied','Shortlisted','Rejected','Selected'],default:'Applied'} }, opts);
applicationSchema.index({student:1,job:1},{unique:true});
export const User=mongoose.model('User',userSchema); export const Job=mongoose.model('Job',jobSchema); export const Application=mongoose.model('Application',applicationSchema);

