* [Configuration](#configuration)
* [Credits](#credits)

A Hugo Module to show a photo gallery. It's very fast/effective, especially if you have lots of images on display.

This theme is what you see on [staticbattery.com](https://staticbattery.com/) which, at the time of writing this, [scores 100](https://pagespeed.web.dev/report?url=https%3A%2F%2Fstaticbattery.com%2F&form_factor=mobile) at Google PageSpeed for both mobile and desktop.

[<img src="https://raw.githubusercontent.com/bep/gallerydeluxe/main/images/tn.jpg">](https://staticbattery.com/)

## Configuration

The recommended way to add this to your site is to include it as a Hugo Module. See the [exampleSite Module config](https://github.com/bep/gallerydeluxe/blob/164faeed389712d53bfeec18a36b19072fc14ad6/exampleSite/config.toml#L46):

```toml

[module]
    [[module.mounts]]
        source = "assets"
        target = "assets"
    [[module.mounts]]
        source = "layouts"
        target = "layouts"
    [[module.mounts]]
        source = "content"
        target = "content"
    [[module.mounts]]
        source = "static"
        target = "static"
    [[module.mounts]]
        source = '/Users/bep/Pictures/Albums/Staticbattery'
        target = 'content/images'
    [[module.imports]]
        path = "github.com/bep/gallerydeluxe"
```

Also See the annotated [index.html](exampleSite/layouts/index.html) for a brief explanation about how to set this up. Note that we currently only support 1 gallery per page. **Note** that the `exampleSite` is currently configured to load a [directory from bep's MacBook](https://github.com/bep/gallerydeluxe/blob/main/exampleSite/config.toml#L38). If you want to take this for a spin, modify that so it points to a directory with some JPEGs on your PC.

### Params

```toml
[params]
    [params.gallerydeluxe]
        # Shuffle the images in the gallery to give the impression of a new gallery each time.
        shuffle = false

        # Reverse the order of the images in the gallery.
        reverse = false

         # Enable Exif data in the gallery.
         # See https://gohugo.io/content-management/image-processing/#exif-data for how to filter tags.
        enable_exif = false
```


## Credits

Credit to Dan Schlosser for the [Pig](https://github.com/schlosser/pig.js) JS library. 
