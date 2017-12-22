import Vue from 'vue'

const Event = new Vue()

export function startWorking (page) {
  Event.$emit('TaskWorking', {page: page, state: true})
}

export function stopWorking (page) {
  Event.$emit('TaskWorking', {page: page, state: false})
}

export function onEvent (callback) {
  Event.$on('TaskWorking', (data) => {
    callback(data)
  })
}
