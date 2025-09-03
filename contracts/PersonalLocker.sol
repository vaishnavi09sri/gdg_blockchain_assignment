// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

contract PersonalLocker {
    string public block_contr;
    string private password;
    address public owner;

    event MessageUpdated(string oldMessage, string newMessage);

    constructor(string memory initialMessage, string memory _password) {
        owner = msg.sender;
        block_contr = initialMessage;
        password = _password;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function updateMessage(string memory newMessage, string memory _password) public onlyOwner {
        require(keccak256(bytes(_password)) == keccak256(bytes(password)), "Incorrect password");
        string memory oldMessage = block_contr;
        block_contr = newMessage;
        emit MessageUpdated(oldMessage, newMessage);
    }

    function viewMessage() public view returns (string memory) {
        return block_contr;
    }

    function revealPassword() public view returns (string memory) {
        return password;
    }

    receive() external payable {}
    fallback() external payable {}
}
