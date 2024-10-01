package com.bridge.api

import android.app.Activity
import android.content.Intent
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableType

class ActivityManagerAPI {

  private fun addExtrasFromReadableMap(intent: Intent, readableMap: ReadableMap) {
    val iterator = readableMap.keySetIterator()

    while (iterator.hasNextKey()) {
      val key = iterator.nextKey()
      when (readableMap.getType(key)) {
        ReadableType.String -> intent.putExtra(key, readableMap.getString(key))
        ReadableType.Boolean -> intent.putExtra(key, readableMap.getBoolean(key))
        ReadableType.Number -> {
          // React Native `ReadableMap` treats all numbers as `Double`
          val numberValue = readableMap.getDouble(key)
          if (numberValue % 1 == 0.0) {
            intent.putExtra(key, numberValue.toInt()) // Integer
          } else {
            intent.putExtra(key, numberValue) // Double
          }
        }

        else -> {}
      }
    }
  }

  fun setResultAndFinish(context: ReactContext, result: String, extras: ReadableMap) {
    val activity = context.currentActivity

    val resultCode = when (result) {
      "ok" -> Activity.RESULT_OK
      "cancel" -> Activity.RESULT_CANCELED
      else -> -2
    }

    val intent = Intent()
    addExtrasFromReadableMap(intent, extras)
    activity?.setResult(resultCode, intent)
    activity?.finish()
  }
}
