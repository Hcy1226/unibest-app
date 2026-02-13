const fs = require('fs');
const path = require('path');

const filePath = 'e:\\企业运营管理系统\\企业运营管理系统\\unibest\\src\\pages\\task\\list.vue';

console.log('Reading file:', filePath);
let content = fs.readFileSync(filePath, 'utf8');

// Check if the file has the assignTask function
if (content.includes('assignTask')) {
    console.log('✓ Found assignTask function');

    // Replace the broken assignTask with a working version
    // Pattern 1: Try to find and replace the current broken version
    const patterns = [
        // Pattern with navigateTo call
        /const assignTask = \(task: ITask\) => \{[^}]*navigateTo\([^)]*\)[^}]*\}/s,
        // Pattern with showEmployeeSelector
        /const assignTask = \(task: ITask\) => \{[^}]*showEmployeeSelector[^}]*\}/s,
        // General pattern
        /const assignTask = \(task: ITask\) => \{[\s\S]*?\n\}/
    ];

    const correctFunction = `const assignTask = (task: ITask) => {
  console.log('[Task List] Assign task:', task.id)
  uni.navigateTo({ url: \`/pages/task/assign?taskId=\${task.id}\` })
}`;

    let replaced = false;
    for (const pattern of patterns) {
        if (content.match(pattern)) {
            content = content.replace(pattern, correctFunction);
            console.log('✓ Replaced assignTask function');
            replaced = true;
            break;
        }
    }

    if (!replaced) {
        console.log('! Could not find pattern to replace, adding function...');
        // Find a good place to add it (after showTaskDetail function)
        const insertPoint = content.indexOf('const showTaskDetail');
        if (insertPoint > 0) {
            const endOfFunction = content.indexOf('\n}', insertPoint) + 2;
            content = content.slice(0, endOfFunction) + '\n\n// Assign task\n' + correctFunction + '\n' + content.slice(endOfFunction);
            console.log('✓ Added assignTask function');
        }
    }
} else {
    console.log('! assignTask not found, adding it...');
    // Add the function
    const insertMarker = '// Get assignee name by ID';
    const insertPoint = content.indexOf(insertMarker);
    const correctFunction = `// Assign task
const assignTask = (task: ITask) => {
  console.log('[Task List] Assign task:', task.id)
  uni.navigateTo({ url: \`/pages/task/assign?taskId=\${task.id}\` })
}

`;
    content = content.slice(0, insertPoint) + correctFunction + content.slice(insertPoint);
    console.log('✓ Added assignTask function');
}

// Write the file
fs.writeFileSync(filePath, content, 'utf8');
console.log('✓ File saved successfully');
console.log('\nPlease refresh the mini-program to see the changes.');
