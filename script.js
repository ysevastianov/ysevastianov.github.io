document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts');

    // List your post files here
    const posts = [
        'posts/test.html'
        'posts/test2.html'
    ];

    posts.forEach(function(post) {
        fetch(post)
            .then(response => response.text())
            .then(html => {
                postsContainer.innerHTML += `<div class="post">${html}</div>`;
            })
            .catch(err => console.error('Error loading the post:', err));
    });
});
