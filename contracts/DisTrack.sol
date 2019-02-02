pragma solidity ^0.4.22;
pragma experimental ABIEncoderV2;

//"1","calden","123","456","789"

contract DisTrack{
    
    struct supplier{
        string name;
        string latitude;
        string longitude;
        string altitude;
        uint firstAid;
        uint foodPack;
        uint waterPack;
    }
    
    struct asset{
        string name;
        string expire;
    }
    
    struct drone{
        string name;
        uint category;
        bool status;
        string latitude;
        string longitude;
        string altitude;
    }
    
    mapping (string => supplier) supplierMap;
    mapping (string => asset) assetMap;
    mapping (uint => drone) droneMap;
    
    function createSupplier(string _id,string _name,string _latitude, string _longitude, string _altitude) public payable returns(bool){
        supplier supplierObj;
        supplierObj.name=_name;
        supplierObj.latitude=_latitude;
        supplierObj.longitude=_longitude;
        supplierObj.altitude=_altitude;
        supplierMap[_id]=supplierObj;
        return true;
    }
    
    function addAssetsToSupplier(string _assetId,string _supplierId) public payable returns(bool){
        if(compareStrings(_assetId,"1")){
            if(supplierMap[_supplierId].firstAid==0){
                supplierMap[_supplierId].firstAid=1;
            }
            else{
                supplierMap[_supplierId].firstAid = supplierMap[_supplierId].firstAid + 1;
            }
        }
        else if(compareStrings(_assetId,"2")){
            if(supplierMap[_supplierId].foodPack==0){
                supplierMap[_supplierId].foodPack=1;
            }
            else{
                supplierMap[_supplierId].foodPack = supplierMap[_supplierId].foodPack + 1;
            }
        }
        else{
            if(supplierMap[_supplierId].waterPack==0){
                supplierMap[_supplierId].waterPack=1;
            }
            else{
                supplierMap[_supplierId].waterPack = supplierMap[_supplierId].waterPack + 1;
            }
        }
        return true;
    }
    
    function getSupplierDetails(string _id) public view returns(string, string, string, string, uint,uint,uint){
        return (supplierMap[_id].name,supplierMap[_id].latitude,supplierMap[_id].longitude,supplierMap[_id].altitude,supplierMap[_id].firstAid,supplierMap[_id].foodPack,supplierMap[_id].waterPack);
    }

    function initialize() public payable returns(bool){
        uint i;
        for(i=0;i<3;i++){
            droneMap[i].status=false;
        }
    }

    function request(string _latitude, string _longitude, string _altitude) public payable returns(uint){
        uint i;
        for(i=0;i<3;i++){
            if(droneMap[i].status==false){
                break;
            }
        }
        droneMap[i].status=true;
        droneMap[i].latitude=_latitude;
        droneMap[i].longitude=_longitude;
        droneMap[i].altitude=_altitude;
        return i;
    }
    
    function checkStatus(uint _id) public view returns(bool, string, string, string){
        if(droneMap[_id].status==true){
            return (true,droneMap[_id].latitude,droneMap[_id].longitude,droneMap[_id].altitude);
        }
        return (false,"","","");
    }
    
    function completedOperation(uint _id) public payable returns(bool){
        droneMap[_id].status=false;
    }

    function compareStrings (string a, string b) view returns (bool){
       return keccak256(a) == keccak256(b);
   }
   
   function uintToString(uint v) constant returns (string str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = byte(48 + remainder);
        }
        bytes memory s = new bytes(i + 1);
        for (uint j = 0; j <= i; j++) {
            s[j] = reversed[i - j];
        }
        str = string(s);
    }
}
