// @desc Get the posts
// @ GET api/posts

let posts = [{
    id: 1,
    title: 'Hello World',
}, {
    id: 2,
    title: 'Hello World 2',
}]

export const getPosts = (req, res) => {
    // always parse as ints
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
        // posts.slice, returns up to the specified liimit
        res.status(200).json(posts.slice(0, limit));
    } else {
        res.status(200).json(posts);
    }
}

// @desc Get unique posts
// @ GET api/posts/:id

export const getPost = (req, res, next) => {
    console.log(req.params)
    const id = parseInt(req.params.id);
    console.log(id)
    const post = posts.find(post => post.id === id);

    if (!post) {
        // custom error handling
        const error = new Error(`Post not found with id: ${id}`);
        error.status = 404;
        return next(error);
    }

    res.status(200).json(post);
    // with braquets body is a statement, not an expression
}

// @desc Create a post
// @ POST api/posts

export const createPost = (req, res, next) => {
    console.log(req.body);

    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    }

    if (!newPost.title) {
        const error = new Error('Title is required');
        error.status = 400;
        return next(error);
    }
    posts.push(newPost)
    res.status(200).json(posts);
}

// @desc Update
// @ PUT api/posts/:id

export const updatePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if (!post) {
        const error = new Error(`Post not found with id: ${id}`);
        error.status = 404;
        return next(error);
    }
    post.title = req.body.title;
    res.status(200).json(posts);
}

// @desc Delete Post
// @ DELETE api/posts/:id

export const deletePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    if (!post) {
        const error = new Error(`Post not found with id: ${id}`);
        error.status = 400;
        return next(error);
    }
    posts = posts.filter(post => post.id !== id);
    res.status(200).json(posts);

}