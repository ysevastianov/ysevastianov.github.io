document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts');

    // List your post files here
    const posts = [
        'posts/2024-04-30-first-post.md',
        'posts/2024-05-01-another-post.md'
    ];

    posts.forEach(function(post) {
        fetch(post)
            .then(response => response.text())
            .then(text => {
                const html = marked(text);
                postsContainer.innerHTML += `<div class="post">${html}</div>`;
            })
            .catch(err => console.error('Error loading the post:', err));
    });
});
