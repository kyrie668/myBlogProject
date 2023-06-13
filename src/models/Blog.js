import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        imageUrL: {
            type: String,
        },
        category: {
            type: String,
            required: true,
            enum: ['React', 'Vue', 'Angular', 'Flutter', 'JavaScript'],
        },
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    { timestamps: true }
);

export default mongoose?.models?.Blog || mongoose.model('Blog', BlogSchema);
