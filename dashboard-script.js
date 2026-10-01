// Update current date
document.addEventListener('DOMContentLoaded', function() {
    updateCurrentDate();
    initializeNavigation();
    initializeInteractivity();
    initializeAddAssignment();
});

// Update and display current date
function updateCurrentDate() {
    const dateElement = document.getElementById('current-date');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', options);
    dateElement.textContent = formattedDate;
}

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Handle section switching if needed
            const section = this.getAttribute('data-section');
            switchSection(section);
        });
    });
}

// Switch between sections
function switchSection(sectionName) {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const activeSection = document.getElementById(sectionName);
    if (activeSection) {
        activeSection.classList.add('active');
    }
}

// Initialize interactive elements
function initializeInteractivity() {
    // Card click handlers
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
    
    // Button click handlers
    const buttons = document.querySelectorAll('.btn-small');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            handleButtonClick(this);
        });
    });
    
    // Notification button
    const notificationBtn = document.querySelector('.btn-notification');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showNotifications();
        });
    }
}

// Handle button clicks
function handleButtonClick(button) {
    const text = button.textContent.trim();
    const card = button.closest('.card');
    const cardTitle = card ? card.querySelector('h3').textContent : 'Item';
    
    switch(text) {
        case 'Submit':
            showAlert(`Assignment submitted: ${cardTitle}`);
            break;
        case 'Details':
            showAlert(`Viewing details for: ${cardTitle}`);
            break;
        case 'Watch Now':
            showAlert(`Opening video: ${cardTitle}`);
            break;
        case 'Download':
            showAlert(`Downloading: ${cardTitle}`);
            break;
        case 'View':
            showAlert(`Viewing: ${cardTitle}`);
            break;
        case 'Access':
            showAlert(`Accessing: ${cardTitle}`);
            break;
        case 'Start Quiz':
            showAlert(`Starting quiz: ${cardTitle}`);
            break;
        case 'Listen':
            showAlert(`Playing audio: ${cardTitle}`);
            break;
        default:
            showAlert(`Action: ${text}`);
    }
}

// Show custom alert
function showAlert(message) {
    // Create a temporary alert element
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

// Show notifications
function showNotifications() {
    const notifications = [
        'You have 1 new message from Prof. Smith',
        'Assignment deadline reminder: Mathematics - 2 days left',
        'Your grade for Physics Lab has been posted'
    ];
    
    let message = 'Recent Notifications:\n\n';
    notifications.forEach((notif, index) => {
        message += `${index + 1}. ${notif}\n`;
    });
    
    showAlert('You have 3 new notifications');
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .section {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    
    .section.hidden {
        display: none;
        opacity: 0;
    }

    /* Modal Styles */
    .modal {
        display: none;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        animation: fadeIn 0.3s ease;
    }

    .modal.active {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        max-width: 500px;
        width: 90%;
        animation: slideUp 0.3s ease;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        border-bottom: 2px solid #f3f4f6;
        padding-bottom: 1rem;
    }

    .modal-header h2 {
        margin: 0;
        color: #1f2937;
        font-size: 1.5rem;
    }

    .close-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6b7280;
        transition: color 0.2s ease;
    }

    .close-btn:hover {
        color: #1f2937;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        color: #1f2937;
        font-weight: 500;
    }

    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-size: 1rem;
        font-family: inherit;
        transition: border-color 0.2s ease;
    }

    .form-group input:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-group textarea {
        resize: vertical;
        min-height: 100px;
    }

    .modal-footer {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 2px solid #f3f4f6;
    }

    .btn-cancel,
    .btn-add {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .btn-cancel {
        background: #e5e7eb;
        color: #1f2937;
    }

    .btn-cancel:hover {
        background: #d1d5db;
    }

    .btn-add {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }

    .btn-add:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    .btn-add:active {
        transform: translateY(0);
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes slideUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .add-assignment-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-bottom: 1.5rem;
        font-size: 1rem;
    }

    .add-assignment-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    .add-assignment-btn:active {
        transform: translateY(0);
    }

    .new-assignment-card {
        animation: slideInCard 0.3s ease;
    }

    @keyframes slideInCard {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize Add Assignment functionality
function initializeAddAssignment() {
    createAddAssignmentModal();
    setupAddAssignmentButton();
}

// Create the modal for adding assignments
function createAddAssignmentModal() {
    const modal = document.createElement('div');
    modal.id = 'addAssignmentModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Add New Assignment</h2>
                <button class="close-btn">&times;</button>
            </div>
            <form id="addAssignmentForm">
                <div class="form-group">
                    <label for="assignmentTitle">Assignment Title *</label>
                    <input 
                        type="text" 
                        id="assignmentTitle" 
                        placeholder="e.g., Mathematics - Calculus" 
                        required
                    >
                </div>
                <div class="form-group">
                    <label for="assignmentSubject">Subject *</label>
                    <input 
                        type="text" 
                        id="assignmentSubject" 
                        placeholder="e.g., Mathematics, Physics, English" 
                        required
                    >
                </div>
                <div class="form-group">
                    <label for="assignmentDeadline">Deadline *</label>
                    <input 
                        type="date" 
                        id="assignmentDeadline" 
                        required
                    >
                </div>
                <div class="form-group">
                    <label for="assignmentDescription">Description</label>
                    <textarea 
                        id="assignmentDescription" 
                        placeholder="Add assignment details (optional)"
                    ></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-cancel">Cancel</button>
                    <button type="submit" class="btn-add">Add Assignment</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal on close button
    modal.querySelector('.close-btn').addEventListener('click', closeAddAssignmentModal);
    
    // Close modal on cancel button
    modal.querySelector('.btn-cancel').addEventListener('click', closeAddAssignmentModal);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeAddAssignmentModal();
        }
    });

    // Handle form submission
    document.getElementById('addAssignmentForm').addEventListener('submit', handleAddAssignment);
}

// Setup the add assignment button
function setupAddAssignmentButton() {
    // Check if button already exists
    let addBtn = document.querySelector('.add-assignment-btn');
    if (!addBtn) {
        // Create and insert the button
        addBtn = document.createElement('button');
        addBtn.type = 'button';
        addBtn.className = 'add-assignment-btn';
        addBtn.innerHTML = '<i class="fas fa-plus"></i> Add New Assignment';
        
        // Insert it after the "Assignments" section header
        const assignmentSection = document.querySelector('.assignments-grid');
        if (assignmentSection) {
            assignmentSection.parentNode.insertBefore(addBtn, assignmentSection);
        } else {
            // Fallback: add to main content
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.insertBefore(addBtn, mainContent.firstChild);
            }
        }
    }

    addBtn.addEventListener('click', openAddAssignmentModal);
}

// Open the modal
function openAddAssignmentModal() {
    const modal = document.getElementById('addAssignmentModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close the modal
function closeAddAssignmentModal() {
    const modal = document.getElementById('addAssignmentModal');
    modal.classList.remove('active');
    document.getElementById('addAssignmentForm').reset();
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Handle form submission - Add new assignment
function handleAddAssignment(e) {
    e.preventDefault();

    // Get form values
    const title = document.getElementById('assignmentTitle').value.trim();
    const subject = document.getElementById('assignmentSubject').value.trim();
    const deadline = document.getElementById('assignmentDeadline').value;
    const description = document.getElementById('assignmentDescription').value.trim();

    // Validation
    if (!title || !subject || !deadline) {
        showAlert('Please fill in all required fields');
        return;
    }

    // Validate deadline is not in the past
    const selectedDate = new Date(deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showAlert('Deadline cannot be in the past');
        return;
    }

    // Create new assignment card
    const newAssignment = createAssignmentCard(title, subject, deadline, description);

    // Add to assignments grid
    const assignmentsGrid = document.querySelector('.assignments-grid');
    if (assignmentsGrid) {
        assignmentsGrid.appendChild(newAssignment);
    }

    // Show success message
    showAlert(`✓ Assignment "${title}" added successfully!`);

    // Save to localStorage (bonus feature)
    saveAssignmentToStorage(title, subject, deadline, description);

    // Close modal
    closeAddAssignmentModal();
}

// Create assignment card element
function createAssignmentCard(title, subject, deadline, description) {
    const card = document.createElement('div');
    card.className = 'card assignment-card new-assignment-card';

    // Format deadline
    const deadlineDate = new Date(deadline);
    const formattedDeadline = deadlineDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    // Color variations
    const colors = ['#f093fb', '#f5576c', '#fa7e1e', '#d53f8c'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    card.innerHTML = `
        <div class="card-header assignment" style="background: linear-gradient(135deg, ${randomColor} 0%, ${randomColor}cc 100%);">
            <div class="progress-circle" style="--progress: 0;">
                <span>0%</span>
            </div>
        </div>
        <div class="card-content">
            <h3>${escapeHtml(title)}</h3>
            <p class="due-date"><i class="fas fa-book"></i> Subject: ${escapeHtml(subject)}</p>
            <p class="due-date"><i class="fas fa-hourglass-end"></i> Due: ${formattedDeadline}</p>
            ${description ? `<p class="assignment-description">${escapeHtml(description)}</p>` : ''}
            <div class="card-footer">
                <button class="btn-small btn-primary">Submit</button>
                <button class="btn-small btn-secondary">Details</button>
                <button class="btn-small btn-secondary delete-btn" data-title="${title}">Delete</button>
            </div>
        </div>
    `;

    // Add event listeners to buttons
    card.querySelector('.btn-primary').addEventListener('click', function(e) {
        e.stopPropagation();
        handleButtonClick(this);
    });

    card.querySelectorAll('.btn-secondary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (this.classList.contains('delete-btn')) {
                const title = this.getAttribute('data-title');
                if (confirm(`Delete assignment "${title}"?`)) {
                    card.remove();
                    removeAssignmentFromStorage(title);
                    showAlert(`Assignment "${title}" deleted`);
                }
            } else {
                handleButtonClick(this);
            }
        });
    });

    return card;
}

// Save assignment to localStorage
function saveAssignmentToStorage(title, subject, deadline, description) {
    let assignments = JSON.parse(localStorage.getItem('userAssignments')) || [];
    
    const newAssignment = {
        id: Date.now(),
        title: title,
        subject: subject,
        deadline: deadline,
        description: description,
        createdAt: new Date().toISOString(),
        progress: 0
    };

    assignments.push(newAssignment);
    localStorage.setItem('userAssignments', JSON.stringify(assignments));
}

// Remove assignment from localStorage
function removeAssignmentFromStorage(title) {
    let assignments = JSON.parse(localStorage.getItem('userAssignments')) || [];
    assignments = assignments.filter(a => a.title !== title);
    localStorage.setItem('userAssignments', JSON.stringify(assignments));
}

// Load assignments from localStorage on page load
function loadAssignmentsFromStorage() {
    const assignments = JSON.parse(localStorage.getItem('userAssignments')) || [];
    const assignmentsGrid = document.querySelector('.assignments-grid');
    
    if (assignmentsGrid && assignments.length > 0) {
        assignments.forEach(assignment => {
            const card = createAssignmentCard(
                assignment.title,
                assignment.subject,
                assignment.deadline,
                assignment.description
            );
            assignmentsGrid.appendChild(card);
        });
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.querySelector('.btn-search');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchQuery = prompt('Search for assignments, events, or resources:');
            if (searchQuery) {
                searchDashboard(searchQuery);
            }
        });
    }

    // Load saved assignments from storage
    loadAssignmentsFromStorage();
});

// Search functionality
function searchDashboard(query) {
    const cards = document.querySelectorAll('.card');
    let resultsFound = 0;
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query.toLowerCase())) {
            card.style.opacity = '1';
            card.style.pointerEvents = 'auto';
            resultsFound++;
        } else {
            card.style.opacity = '0.3';
            card.style.pointerEvents = 'none';
        }
    });
    
    if (resultsFound === 0) {
        showAlert(`No results found for "${query}"`);
    } else {
        showAlert(`Found ${resultsFound} result(s) for "${query}"`);
    }
}

// Announcement interaction
document.addEventListener('DOMContentLoaded', function() {
    const announcementItems = document.querySelectorAll('.announcement-item');
    announcementItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            showAlert(`Announcement: ${title}`);
        });
    });
});

// Filter assignments by status
function filterAssignments(status) {
    const assignments = document.querySelectorAll('.assignment-card');
    assignments.forEach(assignment => {
        const progress = assignment.querySelector('.progress-circle span').textContent;
        const progressValue = parseInt(progress);
        
        if (status === 'pending' && progressValue < 100) {
            assignment.style.display = 'block';
        } else if (status === 'completed' && progressValue === 100) {
            assignment.style.display = 'block';
        } else if (status === 'all') {
            assignment.style.display = 'block';
        } else {
            assignment.style.display = 'none';
        }
    });
}

// Add smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Countdown timer for assignments
function updateDeadlineCountdown() {
    const deadlines = document.querySelectorAll('.due-date');
    deadlines.forEach(deadline => {
        // This is a placeholder - in a real app, you'd calculate actual time remaining
        const text = deadline.textContent;
        if (text.includes('Oct 5')) {
            deadline.innerHTML = '<i class="fas fa-hourglass-end"></i> Due: Oct 5, 2026 <span style="color: #ef4444; margin-left: 0.5rem;">(Due Today!)</span>';
        }
    });
}

updateDeadlineCountdown();

// Dark mode toggle (bonus feature)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
