const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');


router.get('/', (req, res) => {

    Blog
        .find()
        .then(blogPosts => {
            res.status(200).json(blogPosts);
        });
});


// router.get('/featured', (req, res) => {

//     Blog
//         .where('featured')
//         .then(featuredBlogs => {
//             res.status(200).json(featuredBlogs);
//         });
// });



router.get('/featured', (req, res) => {
    Blog
        .where ({featured: true})
        .then( featuredBlogs => {
            res.status(200).json(featuredBlogs)
        })
});









// router.get('/:id', (req, res) => {
//     const blogId = req.params.id;

//     console.log('blogId');

//     Blog
//         .findById(blogId)
//         .then(blog => {
//             if (user == null) res.status(404).send('Bad ID');
//             res.status(200).json(blog);
//         })
//         .catch(err => res.status(404).send('Bad ID'));
// });


router.get('/:id', (req, res) => {
    Blog
        .findById(req.params.id)
        .then(blog => {
            if(blog) {
                res.status(200).json(blog)
            } else {
                res.status(404).send("Unknown Blog ID")
            }
        })
        .catch(err => {
            res.status(500).send(err)
        })
});



router.post('/', (req, res) => {
    // New higher scope variable
    let dbUser = null;

    // Fetch the user from the database
    User
        .findById(req.body.author)
        .then(user => {
            // Create a blog
            const newBlog = new Blog(req.body);
            // Bind the user ot it
            newBlog.author = user._id;

            dbUser = user;
         // Save it to the database 
            return newBlog.save();
        })
        .then(blog => {
            // Push the saved blog to the array of blogs associated with the User
            dbUser.blogs.push(blog);
            // Save the user back to the database and respond to the original HTTP request with a copy of the newly created blog.
            dbUser.save().then(() => res.status(201).json(blog));
        })
});



router.post('/', (req, res) => {
    let dbUser = null;
    User
        .findById(req.body.authorId)
        .then(user => {
            dbUser = user;
            const newBlog = new Blog(req.body);
            newBlog.author = user._id;
            return newBlog.save();
        })
        .then(blog => {
            dbUser.blogs.push(blog);
            dbUser.save().then(() => res.status(201).json(blog));
        })
});














router.put('/:id', (req, res) => {
    Blog
    .findByIdAndUpdate(req.params.id, req.body)
    .then(item => {
        res.status(204).json(item)
    })
});





router.delete('/:id', (req, res) => {
    Blog
    .findByIdAndRemove(req.params.id)
    .then(item => {
        res.status(200).json(item)
    }
    )}
);









module.exports = router;








