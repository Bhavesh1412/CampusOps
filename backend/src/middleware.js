import jwt from 'jsonwebtoken'; import {User} from './models.js';
export const asyncHandler=fn=>(req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);
export const authenticateUser=asyncHandler(async(req,res,next)=>{const h=req.headers.authorization;if(!h?.startsWith('Bearer ')) return res.status(401).json({success:false,message:'Authentication required'}); const p=jwt.verify(h.slice(7),process.env.JWT_SECRET); const u=await User.findById(p.id).select('-password'); if(!u||u.disabled)return res.status(401).json({success:false,message:'Account unavailable'}); req.user=u;next();});
export const authorizeRoles=(...roles)=>(req,res,next)=>roles.includes(req.user.role)?next():res.status(403).json({success:false,message:'You do not have permission for this action'});
export const errorHandler=(err,req,res,next)=>{console.error(err.message); if(err.code===11000)return res.status(409).json({success:false,message:'This record already exists'}); res.status(err.status||500).json({success:false,message:err.message||'Server error'});};

