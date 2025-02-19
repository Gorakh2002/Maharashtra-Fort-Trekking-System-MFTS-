using System;
using System.Collections.Generic;

namespace Transaction3.Models;

public partial class Orderdetail
{
    public int Id { get; set; }

    public int Qty { get; set; }

    public int? EventId { get; set; }

    public int? OrderId { get; set; }

    public virtual Event? Event { get; set; }

    public virtual Order? Order { get; set; }
}
