package com.drl.mazi.mazirecorder.datatypes;

import java.io.File;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by lutz on 16/09/15.
 */
public class Attachment implements Serializable {

    public String text = null;
    public List<String> tags;
    public File file = null;

    public Attachment() {
        this.tags = new ArrayList<String>();
    }

    public void setFile(File file) {
        this.file = file;
    }

    public void setTags(String[] tags) {
        this.tags = Arrays.asList(tags);
    }

}
