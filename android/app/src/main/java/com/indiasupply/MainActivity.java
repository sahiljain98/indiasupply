package com.indiasupply;
import com.reactnativenavigation.controllers.SplashActivity;
import android.os.Bundle;
import com.indiasupply.R;
import android.support.annotation.Nullable;
import android.content.Intent; // <--- import
import android.content.res.Configuration; // <--- import

public class MainActivity extends SplashActivity {
    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.splash_activity);
    }
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }

}