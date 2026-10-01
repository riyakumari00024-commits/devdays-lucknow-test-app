/* ===================================
   CAMPUSCONNECT - JAVASCRIPT
   ===================================
   This file contains all the functionality for CampusConnect
   Including navigation, data management, localStorage, search, etc.
   =================================== */

// ===================================
// SAMPLE DATA - This simulates a database
// ===================================

const eventsData = [
    {
        id: 1,
        name: 'Tech Conference 2024',
        date: '2024-10-15',
        time: '09:00 AM',
        location: 'Auditorium Hall',
        description: 'Learn about latest technologies and innovations in computer science.',
        icon: '🎤'
    },
    {
        id: 2,
        name: 'Sports Day',
        date: '2024-10-20',
        time: '10:00 AM',
        location: 'Sports Ground',
        description: 'Annual sports competition featuring various sports activities.',
        icon: '⚽'
    },
    {
        id: 3,
        name: 'Cultural Fest',
        date: '2024-10-25',
        time: '02:00 PM',
        location: 'Campus Grounds',
        description: 'Celebrate diverse cultures with music, dance, and food.',
        icon: '🎭'
    },
    {
        id: 4,
        name: 'Career Fair',
        date: '2024-11-05',
        time: '11:00 AM',
        location: 'Convention Center',
        description: 'Meet with top companies and explore internship opportunities.',
        icon: '💼'
    }
];

const announcementsData = [
    {
        id: 1,
        title: 'Semester Exams Scheduled',
        date: '2024-09-28',
        content: 'Semester examinations will begin from October 10, 2024. All students must register before September 30. Check the portal for exam schedule and hall tickets.'
    },
    {
        id: 2,
        title: 'Library Hours Extended',
        date: '2024-09-27',
        content: 'Library opening hours have been extended. We are now open from 7 AM to 10 PM on weekdays. Weekend hours remain 9 AM to 6 PM.'
    },
    {
        id: 3,
        title: 'Scholarship Applications Open',
        date: '2024-09-26',
        content: 'Merit-based scholarship applications are now open for 2024-25 academic year. Eligible students with CGPA above 3.5 can apply by October 15.'
    },
    {
        id: 4,
        title: 'Campus WiFi Upgrade',
        date: '2024-09-25',
        content: 'Campus WiFi network has been upgraded with faster speeds and better coverage. New password: CampusWiFi2024'
    }
];

const resourcesData = [
    {
        id: 1,
        title: 'Mathematics Calculus Notes',
        subject: 'Mathematics',
        type: 'notes',
        description: 'Complete notes on differential and integral calculus',
        icon: '📝'
    },
    {
        id: 2,
        title: 'Physics Lab Guide',
        subject: 'Physics',
        type: 'pdf',
        description: 'Comprehensive laboratory experiment guide',
        icon: '📄'
    },
    {
        id: 3,
        title: 'English Literature Video Series',
        subject: 'English',
        type: 'video',
        description: 'Video lectures on classic English literature',
        icon: '🎥'
    },
    {
        id: 4,
        title: 'Chemistry Periodic Table',
        subject: 'Chemistry',
        type: 'notes',
        description: 'Interactive periodic table with element properties',
        icon: '⚗️'
    },
    {
        id: 5,
        title: 'Programming Tutorial PDF',
        subject: 'Computer Science',
        type: 'pdf',
        description: 'Beginner-friendly programming tutorial',
        icon: '💻'
    },
    {
        id: 6,
        title: 'History Documentary',
        subject: 'History',
        type: 'video',
        description: 'Documentary on Indian independence movement',
        icon: '📹'
    }
];

const clubsData = [
    {
        id: 1,
        name: 'Coding Club',
        description: 'For students interested in programming and software development.',
        icon: '💻',
        members: 150
    },
    {
        id: 2,
        name: 'Photography Club',
        description: 'Learn and share photography skills with fellow enthusiasts.',
        icon: '📷',
        members: 85
    },
    {
        id: 3,
        name: 'Debate Society',
        description: 'Enhance public speaking and debating skills.',
        icon: '🎤',
        members: 120
    },
    {
        id: 4,
        name: 'Environmental Club',
        description: 'Work on environmental conservation and sustainability projects.',
        icon: '🌱',
        members: 95
    },
    {
        id: 5,
        name: 'Music Club',
        description: 'For musicians and music lovers on campus.',
        icon: '🎵',
        members: 110
    },
    {
        id: 6,
        name: 'Sports Club',
        description: 'Organize and participate in various sports activities.',
        icon: '🏆',
        members: 200
    }
];

// ===================================
// INITIALIZE APP
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSearch();
    setupAssignmentForm();
    setupHamburgerMenu();
    loadAllData();
    loadAssignmentsFromStorage();
    
    console.log('CampusConnect loaded successfully!');
});

// ===================================
// NAVIGATION SYSTEM
// ===================================

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            navigateTo(pageId);
        });
    });
}

// Navigate to a specific page
function navigateTo(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    // Update navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Close hamburger menu if open
    closeHamburgerMenu();
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// ===================================
// HAMBURGER MENU
// ===================================

function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

function closeHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navMenu) navMenu.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
}

// ===================================
// LOAD ALL DATA
// ===================================

function loadAllData() {
    loadHomepage();
    loadEvents();
    loadAnnouncements();
    loadResources();
    loadClubs();
}

// Load Homepage Dashboard
function loadHomepage() {
    // Load upcoming events
    const homeEvents = document.getElementById('homeEvents');
    homeEvents.innerHTML = '';
    eventsData.slice(0, 3).forEach(event => {
        const eventHTML = `
            <div class="event-preview-item">
                <strong>${event.name}</strong>
                <small>${event.date} at ${event.time}</small>
            </div>
        `;
        homeEvents.innerHTML += eventHTML;
    });
    
    // Load pending assignments
    const homeAssignments = document.getElementById('homeAssignments');
    const assignments = getAssignments();
    const pendingAssignments = assignments.filter(a => !a.completed);
    homeAssignments.innerHTML = '';
    
    if (pendingAssignments.length === 0) {
        homeAssignments.innerHTML = '<p style="text-align: center; color: #666;">No pending assignments</p>';
    } else {
        pendingAssignments.slice(0, 3).forEach(assignment => {
            const assignmentHTML = `
                <div class="assignment-preview-item">
                    <strong>${assignment.title}</strong>
                    <small>${assignment.subject} - Due: ${assignment.deadline}</small>
                </div>
            `;
            homeAssignments.innerHTML += assignmentHTML;
        });
    }
    
    // Load latest announcements
    const homeAnnouncements = document.getElementById('homeAnnouncements');
    homeAnnouncements.innerHTML = '';
    announcementsData.slice(0, 3).forEach(announcement => {
        const announcementHTML = `
            <div class="announcement-preview-item">
                <strong>${announcement.title}</strong>
                <small>${announcement.date}</small>
            </div>
        `;
        homeAnnouncements.innerHTML += announcementHTML;
    });
    
    // Load available resources
    const homeResources = document.getElementById('homeResources');
    homeResources.innerHTML = '';
    resourcesData.slice(0, 3).forEach(resource => {
        const resourceHTML = `
            <div class="event-preview-item">
                <strong>${resource.title}</strong>
                <small>${resource.subject} (${resource.type})</small>
            </div>
        `;
        homeResources.innerHTML += resourceHTML;
    });
}

// Load Events Page
function loadEvents() {
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';
    
    eventsData.forEach(event => {
        const eventCard = `
            <div class="item-card">
                <div class="item-card-image">${event.icon}</div>
                <div class="item-card-content">
                    <h3>${event.name}</h3>
                    <p>${event.description}</p>
                    <div class="item-meta">
                        <span><i class="fas fa-calendar"></i> ${event.date}</span>
                        <span><i class="fas fa-clock"></i> ${event.time}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                    </div>
                    <div class="item-card-footer">
                        <button class="btn btn-primary" onclick="showToast('Event added to your calendar!')">Add to Calendar</button>
                    </div>
                </div>
            </div>
        `;
        eventsList.innerHTML += eventCard;
    });
}

// Load Announcements Page
function loadAnnouncements() {
    const announcementsList = document.getElementById('announcementsList');
    announcementsList.innerHTML = '';
    
    announcementsData.forEach(announcement => {
        const announcementCard = `
            <div class="announcement-card">
                <h3>${announcement.title}</h3>
                <p class="announcement-date"><i class="fas fa-calendar"></i> ${announcement.date}</p>
                <p>${announcement.content}</p>
            </div>
        `;
        announcementsList.innerHTML += announcementCard;
    });
}

// Load Resources Page
function loadResources() {
    const resourcesList = document.getElementById('resourcesList');
    resourcesList.innerHTML = '';
    
    resourcesData.forEach(resource => {
        const resourceCard = `
            <div class="item-card">
                <div class="item-card-image">${resource.icon}</div>
                <div class="item-card-content">
                    <h3>${resource.title}</h3>
                    <p>${resource.description}</p>
                    <span class="resource-type">${resource.type.toUpperCase()}</span>
                    <div class="item-meta">
                        <span><i class="fas fa-book"></i> ${resource.subject}</span>
                    </div>
                    <div class="item-card-footer">
                        <button class="btn btn-primary" onclick="showToast('Resource downloaded!')">Download</button>
                    </div>
                </div>
            </div>
        `;
        resourcesList.innerHTML += resourceCard;
    });
}

// Load Clubs Page
function loadClubs() {
    const clubsList = document.getElementById('clubsList');
    clubsList.innerHTML = '';
    
    clubsData.forEach(club => {
        const clubCard = `
            <div class="item-card">
                <div class="item-card-image">${club.icon}</div>
                <div class="item-card-content">
                    <h3>${club.name}</h3>
                    <p>${club.description}</p>
                    <div class="item-meta">
                        <span><i class="fas fa-users"></i> ${club.members} members</span>
                    </div>
                    <div class="item-card-footer">
                        <button class="btn btn-primary" onclick="showToast('Joined ${club.name}!')">Join Club</button>
                    </div>
                </div>
            </div>
        `;
        clubsList.innerHTML += clubCard;
    });
}

// ===================================
// ASSIGNMENTS MANAGEMENT
// ===================================

// Open assignment modal
function openAssignmentModal() {
    document.getElementById('assignmentModal').classList.add('active');
}

// Close assignment modal
function closeAssignmentModal() {
    document.getElementById('assignmentModal').classList.remove('active');
    document.getElementById('assignmentForm').reset();
}

// Setup assignment form
function setupAssignmentForm() {
    const form = document.getElementById('assignmentForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('assignmentTitle').value;
        const subject = document.getElementById('assignmentSubject').value;
        const deadline = document.getElementById('assignmentDeadline').value;
        const description = document.getElementById('assignmentDescription').value;
        
        // Validation
        if (!title || !subject || !deadline) {
            showToast('Please fill all required fields', 'error');
            return;
        }
        
        // Create assignment object
        const assignment = {
            id: Date.now(),
            title,
            subject,
            deadline,
            description,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        // Save to localStorage
        let assignments = JSON.parse(localStorage.getItem('campusConnectAssignments')) || [];
        assignments.push(assignment);
        localStorage.setItem('campusConnectAssignments', JSON.stringify(assignments));
        
        // Show success message
        showToast('Assignment added successfully!', 'success');
        
        // Close modal and reload
        closeAssignmentModal();
        loadAssignmentsFromStorage();
        loadHomepage();
    });
}

// Get assignments from localStorage
function getAssignments() {
    return JSON.parse(localStorage.getItem('campusConnectAssignments')) || [];
}

// Load assignments from localStorage
function loadAssignmentsFromStorage() {
    const assignmentsList = document.getElementById('assignmentsList');
    const assignments = getAssignments();
    
    if (!assignmentsList) return;
    
    assignmentsList.innerHTML = '';
    
    if (assignments.length === 0) {
        assignmentsList.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No assignments yet. Add one to get started!</p>';
        return;
    }
    
    assignments.forEach(assignment => {
        const deadlineDate = new Date(assignment.deadline);
        const formattedDate = deadlineDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        const assignmentHTML = `
            <div class="assignment-item ${assignment.completed ? 'completed' : ''}">
                <div class="assignment-info">
                    <h3>${assignment.title}</h3>
                    <div class="assignment-meta">
                        <span><i class="fas fa-book"></i> ${assignment.subject}</span>
                        <span><i class="fas fa-calendar"></i> ${formattedDate}</span>
                    </div>
                    ${assignment.description ? `<p style="margin-top: 0.5rem; color: #666;">${assignment.description}</p>` : ''}
                </div>
                <div class="assignment-actions">
                    <button class="btn ${assignment.completed ? 'btn-secondary' : 'btn-success'}" onclick="toggleAssignment(${assignment.id})">
                        ${assignment.completed ? '✓ Completed' : 'Mark Done'}
                    </button>
                    <button class="btn btn-danger" onclick="deleteAssignment(${assignment.id})">Delete</button>
                </div>
            </div>
        `;
        
        assignmentsList.innerHTML += assignmentHTML;
    });
}

// Toggle assignment completion
function toggleAssignment(id) {
    let assignments = getAssignments();
    assignments = assignments.map(a => 
        a.id === id ? {...a, completed: !a.completed} : a
    );
    localStorage.setItem('campusConnectAssignments', JSON.stringify(assignments));
    loadAssignmentsFromStorage();
    showToast('Assignment status updated!');
}

// Delete assignment
function deleteAssignment(id) {
    if (confirm('Are you sure you want to delete this assignment?')) {
        let assignments = getAssignments();
        assignments = assignments.filter(a => a.id !== id);
        localStorage.setItem('campusConnectAssignments', JSON.stringify(assignments));
        loadAssignmentsFromStorage();
        showToast('Assignment deleted!', 'warning');
    }
}

// Filter assignments
function filterAssignments(status) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const assignments = getAssignments();
    const assignmentsList = document.getElementById('assignmentsList');
    assignmentsList.innerHTML = '';
    
    let filtered = assignments;
    if (status === 'pending') {
        filtered = assignments.filter(a => !a.completed);
    } else if (status === 'completed') {
        filtered = assignments.filter(a => a.completed);
    }
    
    if (filtered.length === 0) {
        assignmentsList.innerHTML = `<p style="text-align: center; color: #666; padding: 2rem;">No ${status} assignments</p>`;
        return;
    }
    
    filtered.forEach(assignment => {
        const deadlineDate = new Date(assignment.deadline);
        const formattedDate = deadlineDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        const assignmentHTML = `
            <div class="assignment-item ${assignment.completed ? 'completed' : ''}">
                <div class="assignment-info">
                    <h3>${assignment.title}</h3>
                    <div class="assignment-meta">
                        <span><i class="fas fa-book"></i> ${assignment.subject}</span>
                        <span><i class="fas fa-calendar"></i> ${formattedDate}</span>
                    </div>
                    ${assignment.description ? `<p style="margin-top: 0.5rem; color: #666;">${assignment.description}</p>` : ''}
                </div>
                <div class="assignment-actions">
                    <button class="btn ${assignment.completed ? 'btn-secondary' : 'btn-success'}" onclick="toggleAssignment(${assignment.id})">
                        ${assignment.completed ? '✓ Completed' : 'Mark Done'}
                    </button>
                    <button class="btn btn-danger" onclick="deleteAssignment(${assignment.id})">Delete</button>
                </div>
            </div>
        `;
        
        assignmentsList.innerHTML += assignmentHTML;
    });
}

// Filter resources
function filterResources(type) {
    const filterBtns = document.querySelectorAll('.resource-filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const resourcesList = document.getElementById('resourcesList');
    resourcesList.innerHTML = '';
    
    let filtered = resourcesData;
    if (type !== 'all') {
        filtered = resourcesData.filter(r => r.type === type);
    }
    
    filtered.forEach(resource => {
        const resourceCard = `
            <div class="item-card">
                <div class="item-card-image">${resource.icon}</div>
                <div class="item-card-content">
                    <h3>${resource.title}</h3>
                    <p>${resource.description}</p>
                    <span class="resource-type">${resource.type.toUpperCase()}</span>
                    <div class="item-meta">
                        <span><i class="fas fa-book"></i> ${resource.subject}</span>
                    </div>
                    <div class="item-card-footer">
                        <button class="btn btn-primary" onclick="showToast('Resource downloaded!')">Download</button>
                    </div>
                </div>
            </div>
        `;
        resourcesList.innerHTML += resourceCard;
    });
}

// ===================================
// SEARCH FUNCTIONALITY
// ===================================

function initializeSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') performSearch();
    });
}

function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    
    if (!query.trim()) {
        showToast('Please enter a search term', 'warning');
        return;
    }
    
    // Search in all data
    const results = [];
    
    // Search events
    eventsData.forEach(event => {
        if (event.name.toLowerCase().includes(query) || 
            event.description.toLowerCase().includes(query)) {
            results.push({type: 'event', data: event});
        }
    });
    
    // Search announcements
    announcementsData.forEach(announcement => {
        if (announcement.title.toLowerCase().includes(query) || 
            announcement.content.toLowerCase().includes(query)) {
            results.push({type: 'announcement', data: announcement});
        }
    });
    
    // Search assignments
    const assignments = getAssignments();
    assignments.forEach(assignment => {
        if (assignment.title.toLowerCase().includes(query) || 
            assignment.subject.toLowerCase().includes(query)) {
            results.push({type: 'assignment', data: assignment});
        }
    });
    
    // Search resources
    resourcesData.forEach(resource => {
        if (resource.title.toLowerCase().includes(query) || 
            resource.subject.toLowerCase().includes(query)) {
            results.push({type: 'resource', data: resource});
        }
    });
    
    // Search clubs
    clubsData.forEach(club => {
        if (club.name.toLowerCase().includes(query) || 
            club.description.toLowerCase().includes(query)) {
            results.push({type: 'club', data: club});
        }
    });
    
    if (results.length === 0) {
        showToast(`No results found for "${query}"`, 'warning');
    } else {
        showToast(`Found ${results.length} result(s) for "${query}"`);
        console.log('Search Results:', results);
        // You can display results in a modal or separate page
    }
}

// ===================================
// TOAST NOTIFICATION
// ===================================

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

console.log('CampusConnect JavaScript loaded successfully!');
