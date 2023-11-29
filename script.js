// // Frontend logic for employee login and admin view

// // Function to handle employee login form submission
// // document.getElementById('employeeLogin').addEventListener('submit', function (event) {
// //     event.preventDefault();
// //     const employeeId = document.getElementById('employeeId').value;

// //     // Send request to backend to mark attendance for this employee
// //     fetch('/markAttendance', {
// //         method: 'POST',
// //         headers: {
// //             'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ employeeId }),
// //     })
// //         .then(response => response.json())
// //         .then(data => {
// //             if (data.success) {
// //                 alert('Attendance marked successfully!');
// //             } else {
// //                 alert('Failed to mark attendance.');
// //             }
// //         })
// //         .catch(error => {
// //             console.error('Error:', error);
// //             alert('Failed to mark attendance.');
// //         });
// // });

// // Function to fetch all attendance data for admin view
// fetch('/employees')
//     .then(response => response.json())
//     .then(data => {
//         const attendanceData = data;
//         const attendanceTable = document.getElementById('attendanceData');

//         attendanceData.forEach(entry => {
//             const row = document.createElement('tr');
//             row.innerHTML = `<td>${entry.employeeId}</td><td>${entry.date}</td>`;
//             attendanceTable.appendChild(row);

//         });
//         console.log(data);

//         document.getElementById('adminSection').style.display = 'block';
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('Failed to fetch attendance data.');
//     });
