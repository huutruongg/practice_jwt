const authorizeRoles = (roles) => {
    return (req, res, next) => {
      // Sửa logic kiểm tra:
      if (roles.includes(req.user.role)) { // Kiểm tra user có role được phép
        next(); // Nếu có, cho phép tiếp tục
      } else { 
        // Nếu không, trả về lỗi 403
        return res.status(403).json({ message: 'Bạn không có quyền thực hiện hành động này' });
      }
    };
  };
  
  module.exports = authorizeRoles;