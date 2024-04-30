document.addEventListener('DOMContentLoaded', function() {
    fetch('posts/posts.json')
        .then(response => response.json())
        .then(posts => {
            const container = document.getElementById('posts-container');
            posts.forEach(post => {
                const div = document.createElement('div');
                const postTitle = post.replace(/-/g, ' ').replace('.html', '');
                div.innerHTML = `<a href="posts/${post}">${postTitle}</a>`;
                container.appendChild(div);
            });
        })
        .catch(err => console.error('Failed to load posts:', err));
});
