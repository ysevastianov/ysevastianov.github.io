document.addEventListener('DOMContentLoaded', function() {
    fetch('posts/posts.json')
        .then(response => response.json())
        .then(posts => {
            // Sort posts in descending order based on filenames
            posts = posts.sort((a, b) => {
                const dateA = new Date(a.replace('.html', ''));
                const dateB = new Date(b.replace('.html', ''));
                return dateB - dateA;
            });

            const container = document.getElementById('posts-container');
            posts.forEach(post => {
                fetch(`posts/${post}`)
                    .then(response => response.text())
                    .then(htmlContent => {
                        const postContainer = document.createElement('div');
                        postContainer.className = 'post';
                        postContainer.innerHTML = htmlContent;
                        container.appendChild(postContainer);
                    })
                    .catch(err => console.error('Failed to load post content:', err));
            });
        })
        .catch(err => console.error('Failed to load posts:', err));
});
