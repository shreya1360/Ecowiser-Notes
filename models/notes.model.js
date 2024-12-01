module.exports = mongoose => {
    const Notes = mongoose.model(
        "notes",
        mongoose.Schema(
            {
                title: String,
                description: String,
                pinned: Boolean
            },
            {timestamps: true}
        )
    );
    return Notes;
};