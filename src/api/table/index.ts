import request from '@/config/axios'
import type { ConfigData, TableData, TableUpdateData } from './types'

export const getTableListApi = (params: any): Promise<IResponse> => {
  const pageIndex = params['pageIndex']
  const pageSize = params['pageSize']
  const url = `/v1/shows/${pageIndex}/${pageSize}`
  return request.get({ url: url })
}

export const saveTableApi = (data: Partial<TableData>): Promise<IResponse> => {
  if (data.show_id === undefined) {
    const url = `/v1/shows`
    return request.post({
      url: url,
      data: data
    })
  }

  const updateData: TableUpdateData = {
    enable: data.enable!,
    platform: data.platform!,
    room_id: data.room_id!,
    streamer_name: data.streamer_name!,
    out_tmpl: data.out_tmpl!,
    parser: data.parser!,
    save_dir: data.save_dir!,
    post_cmds: data.post_cmds!,
    split_rule: data.split_rule!
  }
  const url = `/v1/shows/${data.show_id}`
  return request.put({
    url: url,
    data: updateData
  })
}

export const getTableDetApi = (id: string): Promise<IResponse<TableData>> => {
  const url = `/v1/shows/${id}`
  return request.delete({ url: url })
}

export const delTableListApi = (ids: string[] | number[]): Promise<IResponse> => {
  const url = `/v1/shows/${ids}`
  return request.delete({ url: url })
}

export const getCoreConfigApi = (): Promise<IResponse> => {
  const url = `/v1/configs/core_config`
  return request.get({ url: url })
}

export const saveCoreConfigApi = (data: Partial<ConfigData>): Promise<IResponse> => {
  const url = `/v1/configs/core_config`
  const resp = {
    Value: JSON.stringify(data)
  }
  return request.put({
    url: url,
    data: resp
  })
}
