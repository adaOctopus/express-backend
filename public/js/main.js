const output = document.querySelector('#output');
const button = document.querySelector('#fetchPosts');
const form = document.querySelector('#postForm');

async function showPosts() {

    try {
        const response = await fetch('http://localhost:8000/api/posts');
        const data = await response.json();
        output.innerHTML = '';
        if (!response.ok) {
            throw new Error('Failed to fetch posts')
        }

        data.forEach(post => {
            const div = document.createElement('div');
            div.textContent = post.title;
            output.appendChild(div);
        })

    } catch (error) {
        throw new Error('Failed to fetch posts: ' + error)

    }

}

// Event listener
button.addEventListener('click', showPosts);


// Create a post
async function createPost(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    console.log(title)

    try {

        const res = await fetch('http://localhost:8000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title })
        })
        if (!res.ok) {
            throw new Error('Failed to create post')
        }

        const newPost = await res.json();
        const div = document.createElement('div');
        div.textContent = newPost.title;
        output.appendChild(div);
        showPosts();

    } catch (error) {
        throw new Error('Failed to create post: ' + error)
    }
}

form.addEventListener('submit', createPost);