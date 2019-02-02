pragma solidity ^0.4.22;
pragma experimental ABIEncoderV2;

//"1","calden","123","456","789"

contract DisTrack{
    
    struct supplier{
        string name;
        string latitude;
        string longitude;
        string altitude;
        string[] assets;
    }
    
    struct asset{
        string name;
        string expire;
    }
    
    mapping (string => supplier) supplierMap;
    mapping (string => asset) assetMap;
    
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
        supplierMap[_supplierId].assets.push(_assetId);
        return true;
    }
    
    function getSupplierDetails(string _id) public view returns(string, string, string, string, string[]){
        return (supplierMap[_id].name,supplierMap[_id].latitude,supplierMap[_id].longitude,supplierMap[_id].altitude,supplierMap[_id].assets);
    }

    function createAsset(string _id, string _name, string _expire)public payable returns(bool){
        asset assetObj;
        assetObj.name=_name;
        assetObj.expire=_expire;
        assetMap[_id]=assetObj;
    }

    function getAssetDetails(string _id) public view returns(string, string){
      return (assetMap[_id].name,assetMap[_id].expire); 
    } 
}
