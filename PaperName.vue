<script setup>
import { ref, onMounted, computed } from 'vue';
import { Select, Button, CheckboxGroup, SelectOption, Modal, Image, InputGroup, Tooltip, message } from 'ant-design-vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { PageHeader } from 'ant-design-vue';
import { useDataStore } from '../../apis/dataStore.js';

const dataStore = useDataStore();
let displayData = ref([])
const selectedPaperName = ref('All')
const selectedFigureType = ref('All')
const selectedStatus = ref('All');
const All = ref('All');
// const paperNameData = ref([...dataStore.fetchedData].map(item => ({ value: item.Name })))
const paperNameData = computed(() =>
  dataStore.fetchedData.map(item => ({ value: item.Name }))
)
const paperNameSelected = value => {
  selectedPaperName.value = value
  console.log(selectedPaperName.value);
}
const handleSearchButton = value => {
  displayData.value = dataStore.fetchedData.filter(item => {
      const nameMatched = item.Name.toLowerCase().includes(selectedPaperName.value.toLowerCase()) ||
      selectedPaperName.value == 'All'
      return nameMatched
    })
}

//CheckBox
const options = ['Yes', 'No']
const state = ref({
  checkedList: [],
})
const handleCheckBox = (v) => {
  console.log(v, state.value.checkedList);
  selectedViewAngles.value = state.checkedList;
}

//Figure Types Selectors
// const figureTypes = ref( [...dataStore.fetchedData].map(item => ({ value: item.doi })))
const All1 = ref('All');
// const figureTypes = computed(() =>
//   dataStore.fetchedData.map(item => ({ value: item.FigureType }))
// );
const figureTypes = computed(() => {
  const uniqueOfFigureTypes = new Map();
  uniqueOfFigureTypes.set('All', { value: 'All' });
  dataStore.fetchedData.forEach(item => {
    const typeValue = item.FigureType;
    if (!uniqueOfFigureTypes.has(typeValue)) {
      uniqueOfFigureTypes.set(typeValue, { value: typeValue });
    }
  });
  return Array.from(uniqueOfFigureTypes.values());
});
const handleFigureTyoe = value => {
  // console.log(value);
  selectedFigureType.value = value
  console.log(selectedFigureType.value, selectedStatus.value, state.value.checkedList);

}

//Moving Status Selectors
const All2 = ref('All');
const status = computed(() => {
  const uniqueOfStatus = new Map();
  uniqueOfStatus.set('All', { value: 'All' })
  dataStore.fetchedData.forEach(item => {
    const statusValue = item.Status;
    if (!uniqueOfStatus.has(statusValue)) {
      uniqueOfStatus.set(statusValue, { value: statusValue });
    }
  });
  return Array.from(uniqueOfStatus.values());
});
const handleStatus = value => {
  selectedStatus.value = value == 'All' ? status : value
  console.log(selectedFigureType.value, selectedStatus.value, state.value.checkedList);

};

// const modalState = computed(() => 
//   dataStore.fetchedData.value.map(item => ({value: item.modal ?? false}))
// );

const showModal = (i) => {
  i.modal = !i.modal;
};

//Button callback
const handleClickedButton = () => {
  displayData.value = dataStore.fetchedData.filter(item => {
    const figureTypeMatch = selectedFigureType.value === 'All' ||
      item.FigureType === selectedFigureType.value;

    const statusMatch = selectedStatus.value === 'All' ||
      item.Status === selectedStatus.value;

    // const viewAngleMatch = selectedViewAngles.value.length === 0 ||
    //   selectedViewAngles.value.includes(item.ViewAngleChange);

    return figureTypeMatch && statusMatch && state.value.checkedList.includes(item.ViewAngleChange);;
  });
  if(displayData.value.length != 0){
    message.success('Data filtered successfully!')
  }else{
    message.error('No data found!')
  }
}

onMounted(async () => {
  await dataStore.fetchData(); // 等待数据加载完成
  // 现在可以正确获取数据
  displayData.value = [...dataStore.fetchedData]
});
</script>

<template>
  <div class="header">
    <PageHeader style="border: 1px solid rgba(235, 237, 240, 0);background-color: rgb(210, 207, 207);"
      title="Visualization in Motion" sub-title="" :ghost=false />
  </div>
  <div style="background-color: rgb(234, 234, 234); margin: 0px; padding: 0px; width: 100%; position: absolute; left: 0px; right: 0px;">
    <div class="container">
    <div class="content">
      <div class="read-the-docs">
        <!-- <div style="display: flex; align-items: center;">
          <Select type='search' show-search :show-arrow="false" style="width: 50%; flex: 1"
            :options="paperNameData"></Select>
          <Button size="middle" style="white-space: nowrap"></Button>
        </div> -->
        <InputGroup compact>
          <Select type='search' show-search :show-arrow="false" style="width: 50%; flex: 1"
            :options="paperNameData" @change="paperNameSelected" v-model:value="All"></Select>
          <Tooltip title="Search by paper name">
            <Button size="middle" type="primary" style='background-color: orange;' @click="handleSearchButton">
            <template #icon>
              <SearchOutlined />
            </template>
          </Button>
          </Tooltip>
        </InputGroup>
        <!-- Paper Name: <Select style="width: 200px" v-model:value="All" :options="paperNameData"
          @change="handleChangePaperNameData">
        </Select> -->
      </div>
      <div class="viewing-angle-change">
        Viewing angle change:
        <CheckboxGroup v-model:value="state.checkedList" :options="options" @change="handleCheckBox" />
      </div>
      <div class="Figure">
        Figure Type(s): <Select style="width: 200px" v-model:value="All1" :options="figureTypes"
          @change="handleFigureTyoe"></Select>
      </div>
      <div class="Movementstatus">
        Movement status: <Select style="width: 200px; margin-right: 100px;" v-model:value="All2" :options="status"
          @change="handleStatus"></Select>
        <Button type="primary" size="large" style="background-color:#ffa500" @click="handleClickedButton">Confirm!</Button>
      </div>
    </div>
  </div>
  <div class="image">
    <ul class="imageList">
      <li v-for="i of displayData" :key="i.id">
        <Image :src='i.Figure' @click="() => showModal(i)" :preview="{ visible: false }" height="100px"></Image>
        <Modal v-model:open="i.modal" title="Information" mask="true" :footer=null :mask=false
          :maskStyle="{ display: 'none' }" :bodyStyle="{ margin: 0 }">
          <div style="overflow: hidden;">
            <img :src="i.Figure" style=" margin-right: 20px; width: 100%; height: 100%" /><br>
            <span class="attribute">Paper Name:</span><span>{{ i.Name }}</span><br>
            <span class="attribute">URL:</span><span>{{ i.doi }}</span><br>
            <span class="attribute">Movement status:</span><span>{{ i.Status }}</span><br>
            <span class="attribute">Cause of exercise:</span><span>{{ i.MovingCause }}</span><br>
            <span class="attribute">Viewing angle change:</span><span>{{ i.ViewAngleChange }}</span><br>
            <span class="attribute">Foreground Color:</span><span>{{ i.Color1 }}</span><br>
            <span class="attribute">Background Color:</span><span>{{ i.Color2 }}</span><br>
            <span class="attribute">Context Color:</span><span>{{ i.Color3 }}</span><br>
          </div>
        </Modal>
      </li>
    </ul>
  </div>
  </div>
  
</template>

<style scoped>
.header {
  position: fixed;
  margin-bottom: 100px;
  top: 0px;
  left: 0px;
  right: 0;
  width: 100%;
  margin: 0 !important;
  padding: 0 !important;
  z-index: 1
}

.container {

  /* float: left; */
  /* margin-top: 300px; */
  padding: 0;
  position: relative;
  left: 0px;
  top: 100px;

  /* margin-bottom: 200px; */
  .content {
    /* position: absolute; */
    margin-top: 0px;

    .read-the-docs {
      margin: 0 25px;
    }

    .viewing-angle-change {
      margin: 25px;
    }

    .Figure {
      margin: 25px;
    }

    .Movementstatus {
      margin: 25px;
    }
  }
}

.image {
  /* position: relative; */
  margin-top: 150px;
  border-top: 1px solid rgb(205, 205, 205);

  .imageList {
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    list-style-type: none;


  }

  li {
    margin: 5px;
    border: orange 3px solid;
    border-radius: 2%;

    .attribute {
      color: blue;
    }
  }
}
</style>
