<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Dialog } from '@/components/Dialog'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton, ElTag } from 'element-plus'
import { Table } from '@/components/Table'
import { getTableListApi, saveTableApi, delTableListApi } from '@/api/table'
import { useTable } from '@/hooks/web/useTable'
import { TableData } from '@/api/table/types'
import { h, ref, unref, reactive } from 'vue'
import Write from './components/Write.vue'
import Detail from './components/Detail.vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'

import { useValidator } from '@/hooks/web/useValidator'
const { required } = useValidator()

const { register, tableObject, methods } = useTable<TableData>({
  getListApi: getTableListApi,
  delListApi: delTableListApi,
  response: {
    list: 'list',
    total: 'total'
  }
})

const { getList } = methods

getList()

const { t } = useI18n()

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'show_id',
    label: t('tableDemo.showID'),
    type: 'show_id',
    form: {
      show: false
    },
    detail: {
      show: false
    }
  },
  {
    field: 'streamer_name',
    label: t('tableDemo.streamerName'),
    search: {
      show: false
    },
    form: {
      colProps: {
        span: 24
      }
    },
    detail: {
      span: 24
    }
  },
  {
    field: 'platform',
    label: t('tableDemo.platform'),
    form: {
      colProps: {
        span: 24
      }
    },
    detail: {
      span: 24
    }
  },
  {
    field: 'room_id',
    label: t('tableDemo.roomID'),
    form: {
      colProps: {
        span: 24
      }
    },
    detail: {
      span: 24
    }
  },
  {
    field: 'out_tmpl',
    label: t('tableDemo.outTmpl'),
    type: 'out_tmpl',
    table: {
      show: false
    },
    form: {
      colProps: {
        span: 24
      }
    },
    detail: {
      span: 24
    }
  },
  {
    field: 'parser',
    label: t('tableDemo.parser'),
    type: 'parser',
    table: {
      show: false
    },
    form: {
      colProps: {
        span: 24
      }
    },
    detail: {
      span: 24
    }
  },
  {
    field: 'save_dir',
    label: t('tableDemo.saveDir'),
    type: 'save_dir',
    table: {
      show: false
    },
    form: {
      colProps: {
        span: 24
      }
    },
    detail: {
      span: 24
    }
  },
  {
    field: 'post_cmds',
    label: t('tableDemo.postCmds'),
    type: 'post_cmds',
    table: {
      show: false
    },
    form: {
      component: 'Input',
      componentProps: {
        type: 'textarea',
        rows: 1
      },
      colProps: {
        span: 24
      }
    },
    detail: {
      span: 24
    }
  },
  {
    field: 'split_rule',
    label: t('tableDemo.splitRule'),
    type: 'split_rule',
    table: {
      show: false
    },
    form: {
      component: 'Input',
      componentProps: {
        type: 'textarea',
        rows: 1
      },
      colProps: {
        span: 24
      }
    },
    detail: {
      span: 24
    }
  },
  {
    field: 'date_created',
    label: t('tableDemo.dateCreated'),
    form: {
      show: false
    }
  },
  {
    field: 'date_updated',
    label: t('tableDemo.dateUpdated'),
    form: {
      show: false
    }
  },
  {
    field: 'enable',
    label: t('tableDemo.enable'),
    formatter: (_: Recordable, __: TableColumn, cellValue: boolean) => {
      return h(
        ElTag,
        {
          type: cellValue === true ? 'success' : 'warning'
        },
        () => (cellValue === true ? t('tableDemo.enableOn') : t('tableDemo.enableOff'))
      )
    },
    form: {
      component: 'Select',
      componentProps: {
        style: {
          width: '100%'
        },
        options: [
          {
            label: '启动',
            value: true
          },
          {
            label: '停止',
            value: false
          }
        ]
      }
    }
  },
  {
    field: 'action',
    width: '260px',
    label: t('tableDemo.action'),
    form: {
      show: false
    },
    detail: {
      show: false
    }
  }
])

const rules = reactive({
  platform: [required()],
  room_id: [required()],
  enable: [required()]
})

const { allSchemas } = useCrudSchemas(crudSchemas)

const dialogVisible = ref(false)

const dialogTitle = ref('')

const AddAction = () => {
  dialogTitle.value = t('exampleDemo.add')
  tableObject.currentRow = null
  dialogVisible.value = true
  actionType.value = ''
}

const delLoading = ref(false)

const delData = async (row: TableData | null, multiple: boolean) => {
  tableObject.currentRow = row
  const { delList, getSelections } = methods
  const selections = await getSelections()
  delLoading.value = true
  await delList(
    multiple ? selections.map((v) => v.show_id) : [tableObject.currentRow?.show_id as string],
    multiple
  ).finally(() => {
    delLoading.value = false
  })
}

const actionType = ref('')

const action = (row: TableData, type: string) => {
  dialogTitle.value = t(type === 'edit' ? 'exampleDemo.edit' : 'exampleDemo.detail')
  actionType.value = type
  tableObject.currentRow = row
  dialogVisible.value = true
}

const writeRef = ref<ComponentRef<typeof Write>>()

const loading = ref(false)

const save = async () => {
  const write = unref(writeRef)
  await write?.elFormRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const data = (await write?.getFormData()) as TableData
      const res = await saveTableApi(data)
        .catch(() => {})
        .finally(() => {
          loading.value = false
        })
      if (res) {
        dialogVisible.value = false
        tableObject.currentPage = 1
        getList()
      }
    }
  })
}
</script>

<template>
  <ContentWrap>
    <!-- <Search :schema="allSchemas.searchSchema" @search="setSearchParams" @reset="setSearchParams" /> -->

    <div class="mb-10px">
      <ElButton type="primary" @click="AddAction">{{ t('exampleDemo.add') }}</ElButton>
      <ElButton :loading="delLoading" type="danger" @click="delData(null, true)">
        {{ t('exampleDemo.del') }}
      </ElButton>
    </div>

    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="allSchemas.tableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :pagination="{
        total: tableObject.total
      }"
      @register="register"
    >
      <template #action="{ row }">
        <ElButton type="primary" v-hasPermi="['example:dialog:edit']" @click="action(row, 'edit')">
          {{ t('exampleDemo.edit') }}
        </ElButton>
        <ElButton
          type="success"
          v-hasPermi="['example:dialog:view']"
          @click="action(row, 'detail')"
        >
          {{ t('exampleDemo.detail') }}
        </ElButton>
        <ElButton type="danger" v-hasPermi="['example:dialog:delete']" @click="delData(row, false)">
          {{ t('exampleDemo.del') }}
        </ElButton>
      </template>
    </Table>
  </ContentWrap>

  <Dialog v-model="dialogVisible" :title="dialogTitle">
    <Write
      v-if="actionType !== 'detail'"
      ref="writeRef"
      :form-schema="allSchemas.formSchema"
      :rules="rules"
      :current-row="tableObject.currentRow"
    />

    <Detail
      v-if="actionType === 'detail'"
      :detail-schema="allSchemas.detailSchema"
      :current-row="tableObject.currentRow"
    />

    <template #footer>
      <ElButton v-if="actionType !== 'detail'" type="primary" :loading="loading" @click="save">
        {{ t('exampleDemo.save') }}
      </ElButton>
      <ElButton @click="dialogVisible = false">{{ t('dialogDemo.close') }}</ElButton>
    </template>
  </Dialog>
</template>
