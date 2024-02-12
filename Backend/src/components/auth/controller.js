export const login = async (req, res) => {
    try {
        res.status(400).json({
        ok: true,
        });
    } catch (error) {
        throw error;
    }
};