package com.scoutbiz;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.christopherdro.htmltopdf.RNHTMLtoPDFPackage;
import com.rnfs.RNFSPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.github.wuxudong.rncharts.MPAndroidChartPackage;
import com.fileopener.FileOpenerPackage;

/* react native chart */
import java.lang.reflect.Method;
import com.facebook.react.bridge.ReadableNativeArray;
import com.facebook.react.bridge.ReadableNativeMap;

/*react native image crop picker*/
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.imagepicker.ImagePickerPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RCTCameraPackage(),
            new VectorIconsPackage(),
            new RNDeviceInfo(),
            new RNHTMLtoPDFPackage(),
            new RNFSPackage(),
            new ReactNativeDocumentPicker(),
            new MPAndroidChartPackage(),
            new FileOpenerPackage(),
            new PickerPackage(),
            new ImagePickerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    // call for react native >= 0.54.0
    // ReadableNativeArray.setUseNativeAccessor(true);
    // ReadableNativeMap.setUseNativeAccessor(true);
    try {
        Method arrayUseNativeAccessor = ReadableNativeArray.class.getDeclaredMethod("setUseNativeAccessor", boolean.class);
        if (arrayUseNativeAccessor != null) {
            arrayUseNativeAccessor.invoke(null, true);
        }

        Method mapUseNativeAccessor = ReadableNativeMap.class.getDeclaredMethod("setUseNativeAccessor", boolean.class);
        if (mapUseNativeAccessor != null) {
            mapUseNativeAccessor.invoke(null, true);
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
  }
}
