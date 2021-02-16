// 组件控制

export const ruleFindPageUiElement = {
  HOMEPAGE_BLOCK_PLAYLIST_RCMD: true,
  HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST: true,
  HOMEPAGE_VOICELIST_RCMD: true,
  HOMEPAGE_BLOCK_VIDEO_PLAYLIST: true
}
export function errTime () {
  setTimeout(() => {
    return '由于网易云接口权限问题,暂无数据,请尝试搜索其他关键词,或者浏览其他标签'
  }, 1000)
}
