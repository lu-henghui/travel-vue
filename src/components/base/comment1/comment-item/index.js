import CommentsItem from './comment-item.vue'

CommentsItem.install = function (Vue) {
  Vue.component(CommentsItem.name, CommentsItem)
}

export default CommentsItem