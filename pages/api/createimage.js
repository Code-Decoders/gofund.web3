import Jimp from 'jimp';

const customFontSizeName = 60;
const customFontSizeNum = 40;
const customFontSizeToken = 70;
const verticalSpace = 100;

const generateImage = async (name, num, tokenText) => {
    const width = 400;
    const height = 400;

    const img = await Jimp.read('/Users/anshulbhartiya/Desktop/Eth Project/sample2.jpeg');

    const font1 = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
    const font2 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

    img.print(
        font1,
        (width - Jimp.measureText(font1, name)) / 2,
        (height - customFontSizeName - verticalSpace) / 2,
        name
    );

    const combinedText = `${num} ${tokenText}`;
    img.print(
        font2,
        (width - Jimp.measureText(font2, combinedText)) / 2,
        (height + verticalSpace) / 2,
        combinedText
    );

    return img.getBufferAsync(Jimp.MIME_PNG);
};

export default async function handler(
    req,
    res,
) {
    const { name, num, tokenText } = req.query;

    try {
        const imgBuffer = await generateImage(name, num, tokenText);
        res.send(imgBuffer);
    } catch (error) {
        res.status(500).send(error.toString());
    }
    // res.status(200).json({ name: 'John Doe' })
}
