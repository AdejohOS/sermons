import React from "react";
import { Button } from "./ui/button";
import { Category } from "@prisma/client";

interface CategoryPillProps {
  categories: Category[];
}

function CategoryPill() {
  return (
    <div className="overflow-scroll scrollbar-hide">
      <div className="flex whitespace-nowrap gap-5 transition-transform w-max">
        <Button className="py-1 px-3 rounded-md">All</Button>
        <Button className="py-1 px-3 rounded-md" variant="outline">
          Family and faith
        </Button>
        <Button className="py-1 px-3 rounded-md" variant="outline">
          Family and faith
        </Button>
        <Button className="py-1 px-3 rounded-md" variant="outline">
          Family and faith
        </Button>
        <Button className="py-1 px-3 rounded-md" variant="outline">
          Family and faith
        </Button>
        <Button className="py-1 px-3 rounded-md" variant="outline">
          Family and faith
        </Button>
        <Button className="py-1 px-3 rounded-md" variant="outline">
          Family and faith
        </Button>
        <Button className="py-1 px-3 rounded-md " variant="outline">
          Family and faith
        </Button>
        <Button className="py-1 px-3 rounded-md" variant="outline">
          Family and faith
        </Button>
        <Button className="py-1 px-3 rounded-md" variant="outline">
          Family and faith
        </Button>
        <Button className="py-1 px-3 rounded-md" variant="outline">
          Family and faith
        </Button>
        <Button className="py-1 px-3 rounded-md" variant="outline">
          Wealth & Prosperity
        </Button>
      </div>
    </div>
  );
}

export default CategoryPill;
