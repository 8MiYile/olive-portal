export type TableData = {
  show_id: string
  enable: boolean
  platform: string
  room_id: string
  streamer_name: string
  out_tmpl: string
  parser: string
  save_dir: string
  post_cmds: string
  split_rule: string
}

export type TableUpdateData = {
  enable: boolean
  platform: string
  room_id: string
  streamer_name: string
  out_tmpl: string
  parser: string
  save_dir: string
  post_cmds: string
  split_rule: string
}

export type ConfigData = {
  PortalUsername?: string
  PortalPassword?: string
  LogDir?: string
  SaveDir?: string
  OutTmpl?: string
  LogLevel?: number
  SnapRestSeconds?: number
  SplitRestSeconds?: number
  CommanderPoolSize?: number
  ParserMonitorRestSeconds?: number
  DouyinCookie?: string
  KuaishouCookie?: string

  BiliupEnable?: boolean
  CookieFilepath?: string
  Threads?: number
  MaxBytesPerSecond?: number
}
