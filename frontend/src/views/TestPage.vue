<template>
    <div class="scroll-container">
      <v-container>
        <v-row>
          <v-col v-for="(item, index) in boxOffice" :key="index" cols="4">
            <v-card
              class="mx-auto"
              max-width="344"
              :class="{ 'draggableClass': show }"
            >
              <v-img
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                cover
              ></v-img>
  
              <v-card-title>{{ item.movieNm }}</v-card-title>
  
              <!-- 예매 버튼 -->
              <v-btn outlined color="green darken-2">예매</v-btn>
              <v-spacer></v-spacer>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        show: true,
      };
    },
    props: {
      boxOffice: Array,
    },
    mounted() {
      console.log(this.boxOffice);
    },
  };
  </script>
  
  <style lang="scss">
    .scroll-container {
        overflow-x: auto;
        white-space: nowrap;
    }
    
    .scroll-container > * {
        display: inline-block;
        vertical-align: top;
        margin-right: 10px;
    }
    
    .draggableClass {
        cursor: grab;
    }
    
    .draggableClass:active {
        cursor: grabbing;
    }
  </style>
  