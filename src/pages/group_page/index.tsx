/* eslint-disable react/no-unused-state */
import Taro, { Component, Config, getStorage } from "@tarojs/taro";
import { View, ScrollView, Image, Swiper, SwiperItem } from "@tarojs/components";
import { getStore, setStore } from "@/utils/utils";
import SearchBar from "@/components/SearchBar";
import { getResourceData } from "@/api/detail"
import "./index.scss";

type StateType = {
  [propName: string]: any;
};

type ComponentsProps = {
  [propName: string]: any;
};

interface _page {
  props: ComponentsProps;
  state: StateType;
}

class _page extends Component {
  constructor(props) {
    super(props);
  }

  state: StateType = {
    list: []
  };

  componentWillMount() {
    console.log(this.$router.params)
  }

  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidHide() { }

  componentDidShow() {
    const list = getStore('groupList')
    console.log('list', list)
    getResourceData().then(res => {
      console.log('getResourceData', res)
    })
    this.setState({
      list
    })

  }

  componentWillReact() { }

  onSearchBar = () => {

  }

  toDeatilByCategoryId = (detail) => {
    setStore('teachDetail', detail)
    Taro.navigateTo({
      url: `/pages/detail_page/index?categoryId=${detail.id}`,
    });
  }

  render() {
    const { list } = this.state
    return (
      <View className="group_page" id="page">
        <SearchBar onTapSearchBar={() => this.onSearchBar()}></SearchBar>
        <View>
          <View>热门推荐</View>
          <Swiper
            className='test-h'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            indicatorDots
            autoplay>
            <SwiperItem>
              <View className='demo-text-1'>1</View>
            </SwiperItem>
            <SwiperItem>
              <View className='demo-text-2'>2</View>
            </SwiperItem>
            <SwiperItem>
              <View className='demo-text-3'>3</View>
            </SwiperItem>
          </Swiper>
        </View>
        <View>
          <View className='sub_title'>教学资源</View>
          {
            list.map(item => (
              <View className='list_warp' onClick={() => this.toDeatilByCategoryId(item)}>
                <Image className="list_img" mode="aspectFill" src={item.bannerImage}></Image>
                <View className='list_info'>
                  <View>{item.subhead}</View>
                  <View className="list_title">{item.title}</View>
                </View>

              </View>
            ))
          }
        </View>
      </View>
    );
  }
}

export default _page;
