import React from 'react';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Picker,
  ScrollView,
  processColor
} from 'react-native'
import { connect } from 'react-redux'
import {LineChart} from 'react-native-charts-wrapper'

import {
  rupiah,
  server
} from '../../modules'

import {
  pengeluaran,
  resetReportPengeluaran
} from '../../redux/actions'

var bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

var tahun = []

for(var i = 2018; i <= new Date().getFullYear() + 1; i++) {
  tahun.push(i.toString())
}

var choose = []

for(var i in tahun) {
  for(var j in bulan) {
    choose.push(bulan[j] + ' ' + tahun[i])
  }
}


class LineChartScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      data: [],
      kategori: null,
      listKategori: [],
      produk: null,
      listProduk: [],

      _date: []
    };
  }

  _cabang(value) {
    this.setState({cabang: value})
    this.find(this.state.from, this.state.to, value)
  }

  _from(value) {
    if(value > this.state.to) {
      return Alert.alert(null, 'data tidak valid')
    }
    this.setState({from: value})
    this.find(value, this.state.to, this.state.cabang)
  }

  _to(value) {
    if(this.state.from > value) {
      return Alert.alert(null, 'data tidak valid')
    }
    this.setState({to: value})
    this.find(this.state.from, value, this.state.cabang)
  }

  find(_from, _to, cabang) {
    if(_from != undefined && _to != undefined && cabang != null) {
      var data = {
        idPusat: this.props.store[0].idPusat,
        // idPusat: 'WCWjgsdSzKEcE9zra6zZ',
        idCabang: cabang === 'Pusat' ? '' : cabang,
        from: choose[_from].split(' ')[1] + '-' + ((bulan.indexOf(choose[_from].split(' ')[0]) + 1).toString().length === 1 ? '0' + (bulan.indexOf(choose[_from].split(' ')[0]) + 1) : (bulan.indexOf(choose[_from].split(' ')[0]) + 1)) + '-01',
        to: choose[_to].split(' ')[1] + '-' + ((bulan.indexOf(choose[_to].split(' ')[0]) + 1).toString().length === 1 ? '0' + (bulan.indexOf(choose[_to].split(' ')[0]) + 1) : (bulan.indexOf(choose[_to].split(' ')[0]) + 1)) + '-31'
      }

      /*
      *
      loop date
      *
      */
      var stateCopy = this.state._date = []
      for(var i = _from; i <= _to; i++) {
        stateCopy.push(choose[i])
      }
      this.setState(stateCopy)

      /*
      *
      get category
      *
      */
      /*var _getCategory = {
        idPusat: data.idPusat,
        idCabang: data.idCabang
      }
      this._apiGetCategory(_getCategory)*/

      /*
      *
      get product
      *
      */
      /*var _getProduct = {
        idPusat: data.idPusat,
        idCabang: data.idCabang,
        idCategory: ''
      }
      this._apiGetProduct(_getProduct)*/

      /*
      *
      get pemasukan
      *
      */
      var _getPemasukan = {
        idPusat: data.idPusat,
        idCabang: data.idCabang,
        idCategory: null,
        idProduct: null,
        from: data.from,
        to: data.to
      }
      this._apiGetPemasukan(_getPemasukan)

      /*
      *
      set default
      *
      */
      /*this.setState({
        kategori: null,
        produk: null
      })*/
    }
  }

  _kategori(value) {
    this.setState({
      kategori: value,
      // produk: null
    })

    /*
    *
    list_product
    *
    */
    /*var dataListProduct = {
      // idPusat: this.props.store[0].idPusat,
      idPusat: 'WCWjgsdSzKEcE9zra6zZ',
      idCabang: this.state.cabang === 'Pusat' ? '' : this.state.cabang,
      idCategory: value
    }
    fetch(server + '/report/getListProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: this.props.profile.token
      },
      body: JSON.stringify(dataListProduct)
    })
    .then(response => response.json())
    .then(res => {
      if(res.headers.statusCode === 200) {
        this.setState({
          // produk: null,
          listProduk: res.data
        })
      }
    })
    .catch(err => console.log(err))*/
  }

  _produk(value) {
    this.setState({produk: value})
  }

  _apiGetPemasukan(data) {
    /*
    *
    get_pemasukan

    data = {
      idPusat: string,
      idCabang: string,
      idCategory: string,
      idProduct: string,
      from: string,
      to: string'
    }
    *
    */
    fetch(server + '/report/getPemasukan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: this.props.profile.token
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(res => {
      console.log('===== pemasukan =====', res)
      if(res.headers.statusCode === 200) {
        this.setState({
          listKategori: res.data.category,
          listProduk: res.data.product,
          data: res.data.pemasukan,
        })
      }
    })
    .catch(err => console.log(err))
  }

  _apiGetCategory(data) {
    /*
    *
    list_category

    data = {
      idPusat: string,
      idCabang: string
    }
    *
    */
    fetch(server + '/report/getListCategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: this.props.profile.token
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(res => {
      console.log('=== category ===', res)
      if(res.headers.statusCode === 200) {
        this.setState({
          // kategori: null,
          listKategori: res.data
        })
      }
    })
    .catch(err => console.log(err))
  }

  _apiGetProduct(data) {
    /*
    *
    list_product

    data = {
      idPusat: string,
      idCabang: string,
      idCategory: string
    }
    *
    */
    fetch(server + '/report/getListProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: this.props.profile.token
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(res => {
      console.log('=== product ===', res)
      if(res.headers.statusCode === 200) {
        this.setState({
          // produk: null,
          listProduk: res.data
        })
      }
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <View style={{flex: 1, padding: 5, backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5}}>
          <Text style={{fontSize: 10}}>Dari</Text>
          <View style={{flex: 1}}>
            <Picker
              mode = 'dropdown'
              selectedValue = { this.state.from }
              onValueChange = { this._from.bind(this) }>
              <Picker.Item label = 'Select' value = {null} />
              {choose.map((content, index) => {
                return (
                  <Picker.Item key={index} label={content} value={index} />
                )
              })}
            </Picker>
          </View>

          <Text style={{fontSize: 10}}>Hingga</Text>
          <View style={{flex: 1}}>
            <Picker
              mode = 'dropdown'
              selectedValue = { this.state.to }
              onValueChange = { this._to.bind(this) }>
              <Picker.Item label = 'Select' value = {null} />
              {choose.map((content, index) => {
                return (
                  <Picker.Item key={index} label={content} value={index} />
                )
              })}
            </Picker>
          </View>
        </View>
        
        <View style={{flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5}}>
          <Text style={{fontSize: 10}}>Cabang</Text>
          <View style={{flex: 0.5}}>
            <Picker
              mode = 'dropdown'
              selectedValue = { this.state.cabang }
              onValueChange = { this._cabang.bind(this) }>
              <Picker.Item label='Pilih Cabang' value={null} />
              <Picker.Item label={this.props.store[0].name} value='Pusat' />
              {this.props.store[0].cabang.map((content, index) => {
                return (
                  <Picker.Item key={index} label={content.name} value={content.idCabang} />
                )
              })}
            </Picker>
          </View>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5}}>
          <Text style={{fontSize: 10}}>Kategori</Text>
          <View style={{flex: 0.5}}>
            <Picker
              mode = 'dropdown'
              selectedValue = { this.state.kategori }
              onValueChange = { this._kategori.bind(this) }>
              <Picker.Item label='Pilih Kategori' value={null} />
              {this.state.listKategori.map((content, index) => {
                return (
                  <Picker.Item key={index} label={content.name} value={content.idCategory} />
                )
              })}
            </Picker>
          </View>

          <Text style={{fontSize: 10}}>Produk</Text>
          <View style={{flex: 0.5}}>
            <Picker
              mode = 'dropdown'
              selectedValue = { this.state.produk }
              onValueChange = { this._produk.bind(this) }>
              <Picker.Item label='Pilih Produk' value={null} />
              {this.state.listProduk.map((content, index) => {
                return (
                  <Picker.Item key={index} label={content.name} value={content.idProduct} />
                )
              })}
            </Picker>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={{flex: 1, marginTop: 5}}>
          <View style={{flex: 1}}>
          <ScrollView
            horizontal={true}
            style={{flex: 1}}>
            {this.state.data.length === 0 ?
              null
              :
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <View style={{borderWidth: 0.25, padding: 5}}>
                    <Text style={{fontWeight: 'bold'}}>Date</Text>
                  </View>
                  {this.state.listProduk.map((content, index) => {
                    return (
                      <View style={{borderWidth: 0.25, padding: 5}}>
                        <Text style={{fontWeight: 'bold'}}>{content.name}</Text>
                      </View>
                    )
                  })}
                  <View style={{borderWidth: 0.25, padding: 5}}>
                    <Text style={{fontWeight: 'bold'}}>Total</Text>
                  </View>
                </View>

                {this.state.data.map((content, index) => {
                  return (
                    <View key={index} style={{flex: 1}}>
                      <View style={{borderWidth: 0.25, padding: 5}}>
                        <Text style={{fontWeight: 'bold'}}>{content.date}</Text>
                      </View>
                      {content.data.map((_content, _index) => {
                        return (
                          <View key={_index} style={{borderWidth: 0.25, padding: 5, alignItems: 'flex-end'}}>
                            <Text style={{fontWeight: index === this.state.data.length - 1 ? 'bold' : null}}>{rupiah(_content)}</Text>
                          </View>
                        )
                      })}
                      <View style={{borderWidth: 0.25, padding: 5, alignItems: 'flex-end'}}>
                        <Text style={{fontWeight: 'bold'}}>{rupiah(content.total)}</Text>
                      </View>
                    </View>
                  )
                })}
              </View>
            }
          </ScrollView>

          <View style={{flex: 1}}>
            <LineChart
              style={{flex: 1, height: 300}}
              data={this.state.dataChart}
              chartDescription={{text: ''}}
              // legend={this.state.legend}
              marker={this.state.marker}
              xAxis={this.state.xAxis}
              yAxis={this.state.yAxis}
              drawGridBackground={true}
              borderColor={processColor('teal')}
              borderWidth={1}
              drawBorders={true}

              touchEnabled={true}
              dragEnabled={true}
              scaleEnabled={true}
              scaleXEnabled={true}
              scaleYEnabled={true}
              pinchZoom={true}
              doubleTapToZoomEnabled={true}

              dragDecelerationEnabled={true}
              dragDecelerationFrictionCoef={0.99}

              keepPositionOnRotation={false}
              // onSelect={this.handleSelect.bind(this)}
              onChange={(event) => console.log(event.nativeEvent)}
            />
          </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    borderColor: 'blue'
  },
  chart: {
    flex: 1
  }
});

function mapStateToProps (state) {
  return {
    profile: state.user.data,
    store: state.user.store,
    pengeluaran: state.sale.pengeluaran,
    reportPengeluaran: state.sale.reportPengeluaran
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchPengeluaran: (data) => dispatch(pengeluaran(data)),
    dispatchResetReportPengeluaran: (data) => dispatch(resetReportPengeluaran(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LineChartScreen)