#!/usr/bin/env python3
# -*- coding: utf-8 -*-

file_path = r'e:\企业运营管理系统\企业运营管理系统\unibest\src\pages\task\list.vue'

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Employee selector modal template
modal_template = '''
    <!-- Employee Selector Modal -->
    <view v-if="showEmployeeSelector" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click="cancelAssignment">
      <view class="bg-white rounded-2xl p-6 mx-4 max-w-md w-full" @click.stop>
        <view class="flex items-center justify-between mb-4">
          <text class="text-lg font-bold text-slate-900">选择员工</text>
          <button @click="cancelAssignment" class="text-slate-400 hover:text-slate-600">
            <view class="i-material-symbols-close text-[24px]" />
          </button>
        </view>
        
        <view v-if="employeeUsers.length === 0" class="py-8 text-center text-slate-400">
          暂无可指派的员工
        </view>
        
        <view v-else class="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
          <button 
            v-for="employee in employeeUsers" 
            :key="employee.id"
            @click="assignToEmployee(employee.id)"
            class="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-left"
          >
            <view class="w-10 h-10 rounded-full bg-[#00b2b2] flex items-center justify-center text-white font-bold">
              {{ employee.name?.charAt(0) || '?' }}
            </view>
            <view class="flex-1">
              <text class="text-sm font-semibold text-slate-900 block">{{ employee.name }}</text>
              <text class="text-xs text-slate-500">{{ employee.department || '未分配部门' }}</text>
            </view>
          </button>
        </view>
      </view>
    </view>
'''

# Find and insert before CustomTabBar
if '<CustomTabBar />' in content:
    content = content.replace('     </view>\n     <CustomTabBar />', f'     </view>{modal_template}     <CustomTabBar />')
    print("Inserted employee selector modal successfully!")
    
    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {file_path}")
else:
    print("ERROR: Could not find '<CustomTabBar />' in the file")
