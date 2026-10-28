/**
 * @author Tran Van Cuong
 */

// status: 1 = Active, 0 = Inactive. role: 1 = Admin, 2 = Staff.
export const seedCategories = [
  { id: 1, name: "Academic news", status: 1 },
  { id: 2, name: "Student Affairs", status: 1 },
  { id: 3, name: "Campus Safety", status: 1 },
  { id: 4, name: "Archived", status: 0 },
];

export const seedUsers = [
  { id: 1, username: "Admin", password: "Admin", fullName: "Administrator", role: 1, status: 1 },
  { id: 2, username: "staff01", password: "123456", fullName: "Nguyen Van A", role: 2, status: 1 },
  { id: 3, username: "staff02", password: "123456", fullName: "Le Thi B", role: 2, status: 1 },
  { id: 4, username: "staff03", password: "123456", fullName: "Pham Van C", role: 2, status: 0 },
];

// categoryId references seedCategories.id; createdBy references seedUsers.username.
export const seedNews = [
  { id: 1, title: "Semester registration opens", content: "Registration for the new semester starts next Monday.", categoryId: 1, createdBy: "Admin", status: 1 },
  { id: 2, title: "Student club fair", content: "Join the annual club fair at the central hall.", categoryId: 2, createdBy: "staff01", status: 1 },
  { id: 3, title: "Fire drill notice", content: "A campus-wide fire drill will be held on Friday.", categoryId: 3, createdBy: "Admin", status: 1 },
  { id: 4, title: "Library opening hours", content: "The library extends its hours during exam week.", categoryId: 1, createdBy: "staff01", status: 0 },
  { id: 5, title: "Scholarship announcement", content: "Applications for the merit scholarship are now open.", categoryId: 2, createdBy: "Admin", status: 1 },
];
