document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('posts/posts.json');
        const posts = await response.json();
        
        // Sort posts in descending order based on filenames
        posts.sort((a, b) => {
            const dateA = new Date(a.replace('.html', ''));
            const dateB = new Date(b.replace('.html', ''));
            return dateB - dateA;
        });

        const container = document.getElementById('posts-container');
        for (const post of posts) {
            const response = await fetch(`posts/${post}`);
            const htmlContent = await response.text();

            const postContainer = document.createElement('div');
            postContainer.className = 'post';
            postContainer.innerHTML = htmlContent;
            container.appendChild(postContainer);
        }
    } catch (err) {
        console.error('Failed to load posts:', err);
    }
});
