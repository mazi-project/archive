package com.drl.mazi.mazirecorder.utils;


import android.content.Context;

import com.drl.mazi.mazirecorder.datatypes.Interview;
import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import java.io.FileNotFoundException;

/**
 * Created by lutz on 13/04/15.
 */
public class FileUploader {

    private Interview interview;

    private Context context;

    public FileUploader(Context context, Interview interview) {
        this.interview = interview;
        this.context = context;
    }

    public void upload(final String urlString, AsyncHttpResponseHandler handler) throws FileNotFoundException {

        AsyncHttpClient httpClient = new AsyncHttpClient();

        RequestParams params = new RequestParams();

        params.put("text",interview.text);
        params.put("author",interview.author);
        if (interview.image != null)
            params.put("image", interview.image);

        httpClient.post(this.context,urlString,params,handler);
    }

    public void deleteFiles() {
        if (this.interview.image != null)
            this.interview.image.delete();
    }

}