// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract ERC20Stub is Context, IERC20 {
    // constructor(string memory name, string memory symbol) ERC20(name, symbol) {}
    
    string public name = "Stub Token";
    string public symbol = "STUB";
    uint8 public decimals = 18;
    
    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    function totalSupply() external view override returns (uint256) { return _totalSupply; }
    function balanceOf(address account) external view override returns (uint256) { return _balances[account]; }


    function transfer(address to, uint256 amount) external override returns (bool) {
      _transfer(_msgSender(), to, amount);
      return true;
    }

    function allowance(address owner, address spender) external view override returns (uint256) {
      return _allowances[owner][spender];
    }


    function approve(address spender, uint256 amount) external override returns (bool) {
      _approve(_msgSender(), spender, amount);
      return true;
    }

    function transferFrom(address from, address to, uint256 amount) external override returns (bool) {
      uint256 current = _allowances[from][_msgSender()];
      require(current >= amount, "ERC20: transfer amount exceeds allowance");
      _approve(from, _msgSender(), current - amount);
      _transfer(from, to, amount);
      return true;
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external {
        _burn(from, amount);
    }

    function _transfer(address from, address to, uint256 amount) internal {
      require(from != address(0), "ERC20: transfer from the zero address");
      require(to != address(0), "ERC20: transfer to the zero address");
      uint256 fromBalance = _balances[from];
      require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");
      _balances[from] = fromBalance - amount;
      _balances[to] += amount;
      emit Transfer(from, to, amount);
    }

    function _mint(address account, uint256 amount) internal {
      require(account != address(0), "ERC20: mint to the zero address");
      _totalSupply += amount;
      _balances[account] += amount;
      emit Transfer(address(0), account, amount);
    }

    function _burn(address account, uint256 amount) internal {
      require(account != address(0), "ERC20: burn from the zero address");
      uint256 accountBalance = _balances[account];
      require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
      _balances[account] = accountBalance - amount;
      _totalSupply -= amount;
      emit Transfer(account, address(0), amount);
    }

    function _approve(address owner, address spender, uint256 amount) internal {
      require(owner != address(0), "ERC20: approve from the zero address");
      require(spender != address(0), "ERC20: approve to the zero address");
      _allowances[owner][spender] = amount;
      emit Approval(owner, spender, amount);
    }
} 