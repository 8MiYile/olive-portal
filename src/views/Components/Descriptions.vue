<script setup lang="ts">
import { Descriptions } from '@/components/Descriptions'
import { useI18n } from '@/hooks/web/useI18n'
import { reactive } from 'vue'
import { Form } from '@/components/Form'
import { ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus'
import { useForm } from '@/hooks/web/useForm'
import { saveCoreConfigApi, getCoreConfigApi } from '@/api/table'
import { ConfigData } from '@/api/table/types'

const { t } = useI18n()

const schema = reactive<DescriptionsSchema[]>([
  {
    field: 'PortalUsername',
    label: t('configsDemo.PortalUsername')
  },
  {
    field: 'PortalPassword',
    label: t('configsDemo.PortalPassword')
  },
  {
    field: 'LogDir',
    label: t('configsDemo.LogDir')
  },
  {
    field: 'SaveDir',
    label: t('configsDemo.SaveDir')
  },
  {
    field: 'OutTmpl',
    label: t('configsDemo.OutTmpl'),
    span: 24
  },
  {
    field: 'LogLevel',
    label: t('configsDemo.LogLevel'),
    span: 24
  },
  {
    field: 'SnapRestSeconds',
    label: t('configsDemo.SnapRestSeconds')
  },
  {
    field: 'SplitRestSeconds',
    label: t('configsDemo.SplitRestSeconds')
  },
  {
    field: 'CommanderPoolSize',
    label: t('configsDemo.CommanderPoolSize')
  },
  {
    field: 'ParserMonitorRestSeconds',
    label: t('configsDemo.ParserMonitorRestSeconds')
  },
  {
    field: 'DouyinCookie',
    label: t('configsDemo.DouyinCookie'),
    span: 24
  },
  {
    field: 'KuaishouCookie',
    label: t('configsDemo.KuaishouCookie'),
    span: 24
  },
  {
    field: 'CookieFilepath',
    label: t('configsDemo.CookieFilepath'),
    span: 24
  },
  {
    field: 'Threads',
    label: t('configsDemo.Threads'),
    span: 24
  }
])

let form: ConfigData = reactive({})

getCoreConfig()

function getCoreConfig() {
  getCoreConfigApi()
    .then((value) => {
      // console.log(value)
      // console.log(value.data)
      // console.log(value.data.Value)
      let val: ConfigData = JSON.parse(value.data.Value)
      form = Object.assign(form, val)
    })
    .catch((err) => {
      console.log(err)
    })
}

const { register } = useForm()

const formValidation = async () => {
  const res = await saveCoreConfigApi(form)
  if (res) {
    ElMessage.success(t('common.updateSuccess'))
  }
}
</script>

<template>
  <Form is-custom :model="form" @register="register">
    <Descriptions :title="t('configsDemo.form')" :schema="schema" class="mt-20px">
      <template #PortalUsername>
        <ElFormItem prop="PortalUsername">
          <ElInput v-model="form.PortalUsername" />
        </ElFormItem>
      </template>
      <template #PortalPassword>
        <ElFormItem prop="PortalPassword">
          <ElInput v-model="form.PortalPassword" />
        </ElFormItem>
      </template>
      <template #LogDir>
        <ElFormItem prop="LogDir">
          <ElInput v-model="form.LogDir" />
        </ElFormItem>
      </template>
      <template #SaveDir>
        <ElFormItem prop="SaveDir">
          <ElInput v-model="form.SaveDir" />
        </ElFormItem>
      </template>
      <template #OutTmpl>
        <ElFormItem prop="OutTmpl">
          <ElInput v-model="form.OutTmpl" />
        </ElFormItem>
      </template>
      <template #LogLevel>
        <ElFormItem prop="LogLevel">
          <ElInput v-model="form.LogLevel" />
        </ElFormItem>
      </template>
      <template #SnapRestSeconds>
        <ElFormItem prop="SnapRestSeconds">
          <ElInput v-model="form.SnapRestSeconds" />
        </ElFormItem>
      </template>
      <template #SplitRestSeconds>
        <ElFormItem prop="SplitRestSeconds">
          <ElInput v-model="form.SplitRestSeconds" />
        </ElFormItem>
      </template>
      <template #CommanderPoolSize>
        <ElFormItem prop="CommanderPoolSize">
          <ElInput v-model="form.CommanderPoolSize" />
        </ElFormItem>
      </template>
      <template #ParserMonitorRestSeconds>
        <ElFormItem prop="ParserMonitorRestSeconds">
          <ElInput v-model="form.ParserMonitorRestSeconds" />
        </ElFormItem>
      </template>
      <template #DouyinCookie>
        <ElFormItem prop="DouyinCookie">
          <ElInput v-model="form.DouyinCookie" />
        </ElFormItem>
      </template>
      <template #KuaishouCookie>
        <ElFormItem prop="KuaishouCookie">
          <ElInput v-model="form.KuaishouCookie" />
        </ElFormItem>
      </template>
      <template #CookieFilepath>
        <ElFormItem prop="CookieFilepath">
          <ElInput v-model="form.CookieFilepath" />
        </ElFormItem>
      </template>
      <template #Threads>
        <ElFormItem prop="Threads">
          <ElInput v-model="form.Threads" />
        </ElFormItem>
      </template>
    </Descriptions>
    <div class="text-center mt-10px">
      <ElButton @click="formValidation"> {{ t('formDemo.formValidation') }} </ElButton>
    </div>
  </Form>
</template>

<style lang="less" scoped>
.is-required--item {
  position: relative;

  &::before {
    margin-right: 4px;
    color: var(--el-color-danger);
    content: '*';
  }
}
</style>
