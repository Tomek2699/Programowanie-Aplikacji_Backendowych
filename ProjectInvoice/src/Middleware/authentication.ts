import { Request, Response, NextFunction } from 'express';
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth = (req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies.accesstoken;
    
    if (!token) {
        throw "No token"
    }
    try {
      const data = jwt.verify(token, "xxx");
      req.headers.userId = data.id;
      req.headers.username = data.username;
      return next();
    } catch(error) {
      throw error
    }
   };

  module.exports = auth;