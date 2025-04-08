function createCourseCard(course) {
    return `
        <div class="course-card">
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}">
            </div>
            <div class="course-content">
                <h3>${course.fullTitle}</h3>
                <p>Date: ${course.date}</p>
                <div class="course-details">
                    <span><i data-lucide="calendar"></i> ${course.duration}</span>
                    <span><i data-lucide="map-pin"></i> ${course.location}</span>
                </div>
                <div class="course-actions">
                    <a href="${course.pdf}" class="pdf-button" target="_blank">
                        <i data-lucide="file-text"></i> Download PDF
                    </a>
                </div>
            </div>
        </div>
    `;
}

export function loadCourses(location) {
    const coursesGrid = document.querySelector('.courses-grid');
    if (!coursesGrid) return;

    import('./courses.js')
        .then(module => {
            const courses = module.courses;
            const filteredCourses = location 
                ? courses.filter(course => course.location.toLowerCase() === location.toLowerCase())
                : courses;

            coursesGrid.innerHTML = filteredCourses
                .map(course => createCourseCard(course))
                .join('');

            // Reinitialize Lucide icons for the new content
            lucide.createIcons();
        })
        .catch(error => {
            console.error('Error loading courses:', error);
            coursesGrid.innerHTML = '<p>Error loading courses. Please try again later.</p>';
        });
}