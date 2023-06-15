const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");

module.exports = eleventyConfig => {
	// Eleventy Image shortcode
	// https://www.11ty.dev/docs/plugins/image/
	eleventyConfig.addAsyncShortcode("image", async function imageShortcode(src, alt, widths, sizes, loading = 'lazy') {
		// TODO loading=eager and fetchpriority=high
		let imageAttributes = {
			alt,
			sizes,
			loading,
			decoding: "async",
		};

		if (src.startsWith("https://")) {
			// If src is an external URL, skip optimization and return an img tag
			return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async">`;
		} else {
			// Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
			// Warning: Avif can be resource-intensive so take care!
			let formats = ["avif", "webp", "auto"];
			let file = path.join(__dirname, 'src', src);
			let metadata = await eleventyImage(file, {
				widths: widths || ["auto"],
				formats,
				outputDir: path.join(eleventyConfig.dir.output, "img"),
			});
			return eleventyImage.generateHTML(metadata, imageAttributes);
		}
	});
};