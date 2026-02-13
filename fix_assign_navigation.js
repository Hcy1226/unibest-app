const fs = require('fs');
const path = require('path');

const filePath = path.join('e:', '企业运营管理系统', '企业运营管理系统', 'unibest', 'src', 'pages', 'task', 'list.vue');

try {
    // Read file
    let content = fs.readFileSync(filePath, 'utf8');

    // Find and replace the assignTask function
    // Look for the broken version and replace with working navigation
    const brokenPattern = /const assignTask = \(task: ITask\) => \{[^}]*showEmployeeSelector\.value = true[^}]*\}/s;

    const fixedFunction = `const assignTask = (task: ITask) => {
  console.log('[Task List] Assign task:', task.id)
  navigateTo(\`/pages/task/assign?taskId=\${task.id}\`)
}`;

    if (content.match(brokenPattern)) {
        content = content.replace(brokenPattern, fixedFunction);
        console.log('✓ Found and replaced broken assignTask function');
    } else {
        console.log('! Pattern not found, trying alternative approach...');
        // Try alternative pattern
        const altPattern = /const assignTask[^}]*selectedTaskForAssignment[^}]*\}/s;
        if (content.match(altPattern)) {
            content = content.replace(altPattern, fixedFunction);
            console.log('✓ Fixed with alternative pattern');
        } else {
            console.log('✗ Could not find assignTask function to fix');
            process.exit(1);
        }
    }

    // Remove unused refs if they exist
    content = content.replace(/const selectedTaskForAssignment = ref<ITask \| null>\(null\)\s*/g, '');
    content = content.replace(/const showEmployeeSelector = ref\(false\)\s*/g, '');
    content = content.replace(/const employeeUsers = computed\(\(\) => \{[^}]*\}\)\s*/gs, '');
    content = content.replace(/const assignToEmployee = async[^}]*\}\s*\}\s*/gs, '');
    content = content.replace(/const cancelAssignment = \(\) => \{[^}]*\}\s*/g, '');

    // Write back
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✓ File updated successfully!');
    console.log('✓ assignTask now navigates to /pages/task/assign');

} catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
}
