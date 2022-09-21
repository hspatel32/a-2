const fs = require("fs");

let posts = [];
let categories = [];

module.exports.initialize= function(){
    return new Promise((resolve, reject)=>{
        fs.readFile('./data/posts.json',(err,data)=>{
            if(err){
                reject(err);
            }else{
                posts = JSON.parse(data);
                resolve();
            };
        });
        fs.readFile('./data/categories.json',(err,data)=>{
            if(err){
                reject(err);
            }else{
                categories = JSON.parse(data);
                resolve();
            }
        });
    });
};

module.exports.getAllPosts = function(){
    return new Promise((resolve,reject)=>{
        if(posts.length==0){
            reject("no data was returned");
        }else{
            resolve(posts);
        }
    });
};

module.exports.getPublishedPosts = function(){
    return new Promise((resolve,reject)=>{
        let filtPost = [];
        for(let i=0;i< posts.length;i++){
            if(posts[i].published == true){
                filtPost.push(posts[i]);
            }
        }
        if(filtPost.length == 0){
            reject("no data was returned");
        }else{
            resolve(filtPost);
        }
    });
}

module.exports.getCategories = function(){
    return new Promise((resolve,reject)=>{
        if(categories.length == 0){
            reject("no data was returned");
        }else{
            resolve(categories);
        }
    });
};

