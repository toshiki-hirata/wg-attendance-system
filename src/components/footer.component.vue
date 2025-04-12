<template>
  <footer
    class="absolute flex flex-col bottom-0 inset-x-0 w-full pl-56 shadow-2xl items-center bg-gray-300 transition-all duration-200"
    :class="[isShow ? 'h-2/3' : 'h-20']"
  >
    <div
      class="flex w-full justify-between px-4 pt-4 font-bold cursor-pointer"
      @click="isShow = !isShow"
    >
      打刻時間
      <ArrowIcon :class="[isShow ? 'rotate-180' : '']" />
    </div>
    <div v-if="isShow" class="flex justify-center w-full">
      <table class="table-auto">
        <thead>
          <tr>
            <th
              v-for="(column, columnIndex) in header"
              :key="columnIndex"
              class="h-10 underline"
              :style="{ width: column.width }"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(key, rowIndex) in ['start', 'break', 'restart', 'end'] as Array<keyof Attendance>"
            :key="rowIndex"
          >
            <td
              v-for="(column, columnIndex) in header"
              :key="columnIndex"
              class="h-10 px-2 border-2 border-gray-300 bg-gray-100"
            >
              <div v-if="columnIndex === 0">
                {{
                  rowIndex === 0
                    ? '勤務開始'
                    : rowIndex === 1
                    ? '休憩開始'
                    : rowIndex === 2
                    ? '勤務再開'
                    : '勤務終了'
                }}
              </div>
              <div v-else>
                {{ data[columnIndex - 1][key] || '' }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ArrowIcon from '../assets/icons/arrow.icon.vue'
import { useAttendanceStore } from '../stores/attendance.store'

const attendanceStore = useAttendanceStore()
const isShow = ref(false)

export interface Attendance {
  date: string
  start: string
  break: string
  restart: string
  end: string
}

const header = ref<{ label: string; field: string; width: string }[]>([
  { label: '', field: 'label', width: '150px' },
])
const data = ref<Attendance[]>([])

function formatDate(date: Date): string {
  const jstDate = new Date(date.getTime() + (9 * 60 * 60 * 1000)) // JST補正
  return jstDate.toISOString().split('T')[0]
}


function formatMMDD(date: Date): string {
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${mm}/${dd}`
}

onMounted(async () => {
  await attendanceStore.fetchAttendanceHistory()
  const attendances = attendanceStore.attendanceHistory

  const attendanceMap = new Map<string, Attendance>()
  attendances.forEach((attendance) => {
    attendanceMap.set(attendance.date, attendance)
  })

  console.log('attendanceMap', attendanceMap)
  console.log('attendances', attendances)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // 一昨日から7日分のループ
  for (let i = -2; i < 5; i++) {
    const targetDate = new Date(today)
    targetDate.setDate(today.getDate() + i)
    const yyyyMmDd = formatDate(targetDate)
    const mmDd = formatMMDD(targetDate)

    // カラム（日付見出し）追加
    header.value.push({
      label: mmDd,
      field: yyyyMmDd,
      width: '150px',
    })

    // データ行追加
    const attendance = attendanceMap.get(yyyyMmDd)
    data.value.push({
      date: yyyyMmDd,
      start: attendance?.start || '',
      break: attendance?.break || '',
      restart: attendance?.restart || '',
      end: attendance?.end || '',
    })
  }
})
</script>
